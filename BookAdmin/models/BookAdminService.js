/**
 * @title Book_Serivce
 * @author Yoshiya Ito <ito_yoshiya>
 * @version 1.0
 */

var mongo = require('mongoskin');
var db = mongo.db('localhost:27017/BookAdmin', {safe : true});
var books = db.collection('Books');

/**
 * 本を新規登録する関数
 * @param {Object} book　登録する本
 * @param {Function} callback
 */
exports.addBook = function (obj, callback) {
    books.insert(obj, function (err, result) {
        if(err) throw err;
        if(result) console.log('[success] insert');
        if(!result) console.log('[success] insert is failed...');
        callback(result);
    });
};

/**
 * 本を編集する関数
 * @param {Object} book 編集内容
 * @param {Function} callback
 */
exports.updateBook = function (obj, callback) {
    books.update(obj, {$set : {name : 'yoshiyaIto'}}, function (err, result) {
        if (err) throw err;
        if (result) console.log('[success] update');
        if (!result) console.log('[warning] update data is not exist');
        callback(result);
    });
};

/**
 * 本を削除する関数
 * @param {Number}  _id 削除する本のkey
 * @param {Function} callback
 */
exports.removeBook = function (key) {
    books.remove(key, function (err, result) {
        if (err) throw err;
        if (result) console.log('[success] remove');
        if (!result) console.log('[warning] remove data is not exist');
    });
};
/**
 * 本を検索する関数
 * @param {Object} key 検索条件キー
 * @param {Function} callback
 */
exports.searchBook = function (key, callback) {
    book.find(key, function (err, result) {
        if (err) throw err;
        if (!result) console.log('[warning] no search result');
        callback(result);
    }); 
};

/**
 * 本の情報を全件取得する関数
 * @param {Function} callback result/array
 */
exports.getAllBooks = function (callback) {
    books.find().toArray(function (err, result) {
        if (err) throw err;
        if (!result) console.log('[warning] no find data');
        console.log('[success] find');
        callback(result);
    }); 
};

/**
 * 指定された本の情報を一件だけ取得する関数
 * @param {Number} key　本の検索キー
 * @param {Function} callback
 */
exports.getBook = function (key, callback) {
    books.findOne(key, function (err, result) {
        if (err) throw err;
        if (!result) console.log('[warning] no find data');
        console.log('[success] find one');
        callback(result);
    });
};

