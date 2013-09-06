var app = require('../app');
var browser = require('tobi').createBrowser(3000, 'localhost');

describe('yoshiya 辞書', function ()  {
    describe('/search.html基本的なアクセス', function () {
        describe('/search.htmlの存在証明', function () {
            it('空のフォームを取得', function (done) {
                browser.get('/search.html', function (res, $) {
                    res.should.have.status(200);
                    $('#search_form [name=word]').should.have.value(undefined);
                    done();
                }); 
            }); 
        });
        describe('/search.html?word=xx', function () {
            it('辞書にないものを取得する', function (done) {
                browser.get('/search.html?word=hoge', function (res, $) {
                    res.should.have.status(200);
                    $('#result').should.have.text('hoge は辞書に存在しない...');
                    $('#search_form [name=word]').should.have.value('hoge');
                    done();
                }); 
            }); 
        }); 
        describe('/search.html?word=hey', function () {
            it('hey が へい に変換される', function (done) {
                browser.get('/search.html?word=hey', function (res, $) {
                    res.should.have.status(200);
                    $('#result').should.have.text('へい');
                    $('#search_form [name=word]').should.have.value('hey');
                    done();
                }); 
            }); 
        }); 
    });

    describe('/search.txt系のテスト', function () {
        it('ない単語は404が出る', function (done) {
            browser.get('/search.txt?word=hoge', function (res, $) {
                res.should.have.status(404);
                done();
            });   
        });

        it('あるやつは平文で返す', function (done) {
            browser.get('/search.txt?word=hey', function (res, $) {
                res.should.have.status(200);
                $('body').should.have.text('へい');
                done();
            });
        });
        it('あるやつは平文で返す', function (done) {
            browser.get('/search.txt?word=hi', function (res, $) {
                res.should.have.status(200);
                $('body').should.have.text('はい');
                done();
            });
        });
        it('あるやつは平文で返す', function (done) {
            browser.get('/search.txt?word=hello', function (res, $) {
                res.should.have.status(200);
                $('body').should.have.text('こんにちは');
                done();
            });
        });
        it('あるやつは平文で返す', function (done) {
            browser.get('/search.txt?word=bye', function (res, $) {
                res.should.have.status(200);
                $('body').should.have.text('さようなら');
                done();
            });     
        });
        it('複数のクエリは最初のクエリだけ返す', function (done) {
            browser.get('/search.txt?word=bye&word=hey', function (res, $) {
                res.should.have.status(200);
                $('body').should.have.text('さようなら');
                done();
            });     
        });
        //TODO
        //クエリなしの場合
        it('/search.txtアクセスされたときは404を返す', function (done) {
            browser.get('/search.txt', function (res, $) {
                res.should.have.status(404);
                $('body').should.have.text('検索されていません');
                done();
            });     
        });

    });
    describe('/search.json系のテスト', function () {
        it('あるやつは平文で返す', function (done) {
            browser.get('/search.json?word=hey', function (res, $) {
                res.should.have.status(200);
                $('body').should.have.text('{"hey":"へい"}');
                done();
            });
        });
        it('あるやつは平文で返す', function (done) {
            browser.get('/search.json?word=hi', function (res, $) {
                res.should.have.status(200);
                $('body').should.have.text('{"hi":"はい"}');
                done();
            });
        });
        it('あるやつは平文で返す', function (done) {
            browser.get('/search.json?word=hello', function (res, $) {
                res.should.have.status(200);
                $('body').should.have.text('{"hello":"こんにちは"}');
                done();
            });
        });
        it('あるやつは平文で返す', function (done) {
            browser.get('/search.json?word=bye', function (res, $) {
                res.should.have.status(200);
                $('body').should.have.text('{"bye":"さようなら"}');
                done();
            });     
        });
        //クエリなしの場合
        it('/search.jsonアクセスされたときは404を返す', function (done) {
            browser.get('/search.json', function (res, $) {
                res.should.have.status(404);
                $('body').should.have.text('検索されていません');
                done();
            });     
        });
    });
});
