/**
 * @title Search_Page_Controller
 * @author Yoshiya Ito
 * @version 1.0
 */
var bookService = require('../../models/BookAdminService.js');

exports.getSearchPage = function (req, res) {
    res.render('searchpage', {book : ''});
};

exports.searchBook = function (req, res) {
    var selector = {};
    for(var key in req.body) {
        if (req.body[key]) {
            selector[key] = req.body[key];
        }
    }
    var util = require('util');
    console.log(util.inspect(req.body));
    bookService.searchBook(selector, function (result) {
        res.render('searchpage', {books : result, book : ''});
    });
};
