/**
 * @title 辞書I/O
 * @author Yoshiya Ito <ito_yoshiya@cyberagent.co.jp>
 * @version 2.0
 */
var http = require('http');
var url = require('url');
var fs = require('fs');
var dictHTML = fs.readFileSync('./dictionary.html');

//辞書の定義
var MyDictionary = {
    hi : 'はい',
    hey : 'へい',
    hello : 'こんにちは',
    bye : 'さようなら'
};

http.createServer(function (req, res) {

    //検索クエリ
    var query = url.parse(req.url, true).query; 
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});

    if (!query.word) {
        res.end(dictHTML); 
    } else {
        var word = query.word;
        //res.write(dictHTML);
        res.write('<p>辞書です</p>');
        res.write('<form action="" method="get">');
        res.write('<input type="text" name="word" value=' +word+'>');
        res.write('<input type="submit">');
        res.write('</form>');
        var key = word.toLowerCase(); //辞書のハッシュタグ
        res.end(MyDictionary[key] || (key + 'は辞書に存在しません'));
    }

}).listen(8000);
