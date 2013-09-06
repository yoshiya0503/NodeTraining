/**
 * @title Dictionary_Controller
 * @author Yoshiya Ito <ito_yoshiya@cyberagent.co.jp>
 * @version 1.0
 */

var MyDictionary = require('../../Models/dictionary');

var MyDictionary = {
    hi : 'はい',
    hey : 'へい',
    hello : 'こんにちは',
    bye : 'さようなら'
};

/**
 * HTMLを取得した場合のルーティング
 * @param {Object} req
 * @param {Object} res
 */
exports.getHTML = function (req, res) {
    var key = req.query.word && req.query.word.toLowerCase();
    var result = key ? MyDictionary[key] : '';
    res.render('index', { result : result, word : req.query.word});
};

/**
 * Textを取得した場合のルーティング
 * @param {Object} req
 * @param {Object} res
 */
exports.getText = function (req, res) {
    var word = (req.query.word instanceof Array) ? req.query.word[0] : req.query.word;
    var key = word && word.toLowerCase();
    var result = key ? MyDictionary[key] : '';
    var text = result || (word + 'は辞書に存在しない');
    if (!result || !req.query.word) res.status(404);
    res.send(key ? text : '検索されていません');
};

/**
 * JSONを取得した場合のルーティング
 * @param {Object} req
 * @param {Object} res
 */
exports.getJson = function (req, res) { 
    var obj = {};
    var key;
    var result;
    if (req.query.word instanceof Array) {
        for (var i= 0; i < req.query.word.length; i++) {     
            key = req.query.word[i] && req.query.word[i].toLowerCase();
            result = key ? MyDictionary[key] : '';
            obj[req.query.word[i]] = (result || null);
        }
    } else {
        key = req.query.word && req.query.word.toLowerCase();
        result = key ? MyDictionary[key] : '';
        obj[req.query.word] = (result || null);
    }
    if (!req.query.word) res.status(404);
    res.send(key ? JSON.stringify(obj) : '検索されていません');
};
