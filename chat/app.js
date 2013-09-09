
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);
var sio = require('socket.io');
var io = sio.listen(server);
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

io.configure(function () {
    io.set('store', new sio.RedisStore());
});

var redis = require('redis');
var client = redis.createClient();

var chatHandler = require('./ws/chathandler.js');
//ログイン画面の表示
app.get('/', function (req, res) {
    res.render('login');
});
//ルーム画面の表示
app.post('/', function (req, res) {
    var username = req.body.name;
    client.lrange('rooms', 0, -1, function (err, data) {
        var rooms = [];
        for (var i=0; i < data.length; i++) {
            var room = {
                id : (i+1 + data[i]),
                num : i+1, 
                name : data[i]
            };
            rooms.push(room);
        }
        res.render('toppage', {username : username, rooms : rooms});
    });
});

app.get('/:roomid', function (req, res) {
    res.render('room');
});

chatHandler.connectSocket(io);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
