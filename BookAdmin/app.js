
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

var addController = require('routes/add');
var topController = require('routes/toppage');
var modifyController = require('routes/modify');
var detailController = require('routes/detail');
var searchController = require('routes/search');
var deleteController = require('routes/delete');

app.get('/', routes.index);

//WEBページの取得
app.get('/index.html', topController.getTopPage);
app.get('/book/add.html', addController.getAddPage);
app.get('/book/modify.html',modifyController.getModPage);
app.get('/book/detail.html', detailController.getDetailPage);
app.get('/book/search.html', searchController.getSearchPage);

//ポストするデータ
app.post('/book/add_result.html', addController.addBook);
app.post('/book/modify_result.html', modifyController.modifyBook);
app.post('/book/search_result.html', searchController.searchBook);
app.post('/book/delete_result.html', deleteController.deleteBook);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
