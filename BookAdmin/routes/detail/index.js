/**
 * @title Add_Page_Controller
 * @author YOshiya Ito
 * @version 1.0
 */

var bookService = require('../../models/BookAdminService.js');

exports.getDetailPage = function (req, res) {
    bookService.getBook(req.query, function (result) {
        var util = require('util');
        console.log(util.inspect(result));
        res.render('detail', {book : result});
    }); 
};
