/**
 * @title login_controller
 * @author Yoshiya Ito <ito_yoshiya@cyberagent.co.jp>
 * @version 1.0
 */
var user = {
    name : 'admin',
    password : '0906'
};

exports.login = function (req, res) {
    /*
    var no_user_type = 'ゲストか管理者か';
    var no_name = 'ユーザー名を入力してください';
    var no_password = 'パスワードを入力してください';
    var no_login = 'ログインできませんでした';
    */

    res.render('login', {title : 'Login', msg : req.flash('msg'), user : req.session.user});
};

exports.login_result = function (req, res) {
    //フラッシュメッセージの記述
    //req.flash('msg', 'ログインできませんでした');
    var user = req.body;
    req.session.user = user;

    if (!user.usertype) {
        req.flash('msg', 'ゲストか管理者か');
        return res.redirect('/login.html');
    }
    if (!user.name && !user.password) {
        req.flash('msg', '名前を入力してください');
        req.flash('msg', 'パスワードを入力してください');
        return res.redirect('/login.html');
    }
    if (user.usertype === 'guest') {
        
        if (!user.name) {
            req.flash('msg', '名前を入力してください');
            res.redirect('/login.html');
        }
        return res.render('login_result', {user : user});
    }
    if (!user.name) {
        req.flash('msg', '名前を入力してください');
        return res.redirect('/login.html');
    }
    if (!user.password) {
        req.flash('msg', 'パスワードを入力してください');
        return res.redirect('/login.html');
    }
    
    //ログインに成功した場合の処理
    if (varidation(user)) {
        return res.render('login_result', {user : user});
    } 
    req.flash('msg', 'ログインできませんでした');
    return res.redirect('/login.html');
};

var varidation = function (login_user) { 
    return (login_user.name === user.name && login_user.password === user.password) ? true : false;
};
