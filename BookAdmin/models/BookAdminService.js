/**
 * @title Book_Serivce
 * @author Yoshiya Ito <ito_yoshiya>
 * @version 1.0
 */

var mongo = require('mongoskin');
var db = mongo.db('localhost:27017/BookAdmin', {safe : true});
var books = db.collection('books');

/**
 * 本を新規登録する関数
 * @param {Object} book　登録する本
 * @param {Function} callback
 */
exports.addBook = function () {

};

/**
 * 本を編集する関数
 * @param {Object} book 編集内容
 * @param {Function} callback
 */
exports.modifyBook = function () {
    books.update();
};

/**
 * 本を削除する関数
 * @param {Number}  _id 削除する本のID
 * @param {Function} callback
 */
exports.deleteBook = function (id, callback) {
    books.removeById(id, callback); 
};
/**
 * 本を検索する関数
 * @param {Object} 検索条件
 *
 */
exports.searchBook = function () {

};

/**
 * 本の情報を全件取得する関数
 * @param {Function} callback
 */
exports.getAllBooks = function () {

};

/**
 * 指定された本の情報を一件だけ取得する関数
 * @param {Number} _id　本のID
 * @param {Function} callback
 */
exports.getBook = function () {

};
