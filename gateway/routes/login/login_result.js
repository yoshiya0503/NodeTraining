/**
 * @title login_result_controller
 * @author Yoshiya Ito <ito_yoshiya@cyberagent.co.jp>
 * @version 1.0
 */

var login_result = {};

exports.login_result = function (req, res) {
    
    //login情報の値をpostから
    //つまり req.bodyから取得して
    //変なのだったらloginにリダイレクトする
    res.redirect('/login.html');
};
