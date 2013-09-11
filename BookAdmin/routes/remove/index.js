/**
 * @title Remove_Page_Controller
 * @author YOshiya Ito
 * @version 1.0
 */

var bookService = require('../../models/BookAdminService.js');

exports.deleteBook = function (req, res) {
    var util = require('util');
    console.log(util.inspect(req.body));
    bookService.removeBook({ isbn : req.body.isbn}, function (result) {
        console.log('refiredt?');
        res.redirect('/index.html');
        //res.render('toppage');
    });
};
