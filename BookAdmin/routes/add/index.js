/**
 * @title Add_Page_Controller
 * @author YOshiya Ito
 * @version 1.0
 */

var bookService = require('../../models/BookAdminService.js');

exports.getAddPage = function (req, res) {
    bookService.getAllBooks(function (result) {
        res.render('addpage');
    }); 
};

exports.addBook = function (req, res) {
    bookService.addBook(req.body, function (result) {
        res.redirect('/index.html');
    });
};
