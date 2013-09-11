/**
 * @title Add_Page_Controller
 * @author YOshiya Ito
 * @version 1.0
 */

var bookService = require('../../models/BookAdminService.js');

exports.getModPage = function (req, res) {
    bookService.getBook(req.query, function (result) {
        res.render('modpage', {book : result});
    });
};

exports.modifyBook = function (req, res) {
    bookService.updateBook({isbn : req.body.isbn}, req.body, function (result) {
        res.redirect('/index.html');
    });
};
