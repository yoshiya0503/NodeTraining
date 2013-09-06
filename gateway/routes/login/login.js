/**
 * @title login_controller
 * @author yoshiya ito <ito_yoshiya@cyberagent.co.jp>
 * @version 1.0
 */

var login = {};

exports.login = function (req, res) {
    res.render('login', {title : 'Login'});
};
