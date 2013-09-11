/**
 * @title Top_Page_Controller
 * @author Yoshiya Ito
 * @version 1.0
 */
var bookService = require('../../models/BookAdminService.js');
exports.getTopPage = function (req, res) {
    bookService.getAllBooks(function (result) {
        res.render('toppage', {books : result});
    }); 
};
