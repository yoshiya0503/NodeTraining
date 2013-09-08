
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();
var RedisStore = require('connect-redis')(express);
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session({
    store : new RedisStore({db : 1}),    
    cookie : {
        maxAge : 7 * 24 * 60 * 60 * 1000
    }
}));
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);

var server = http.createServer(app);
var sio = require('socket.io');
io = sio.listen(server);

io.configure(function () {
    io.set('store', new sio.RedisStore);
});

var redis = require('redis');
var client = redis.createClient();

client.on('error', function (err) {
    throw err;
});

client.set('counter', 0, redis.print);

io.sockets.on('connection', function (socket) {
    console.log('connect!!!!');
    client.incr('counter');
    client.get('counter', function (err, data) { 
        //dataはredisから得たカウンターの値(半永続化)
        socket.set('count', data, function (err) {
            socket.get('count', function (err, value){
                socket.emit('access', value);
                socket.broadcast.emit('access', value);
            });
        });
    });
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
