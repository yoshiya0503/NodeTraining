/**
 * @title ChatRoom_Service
 * @author Yoshiya Ito <ito_yoshiya@cyberagent.co.jp>
 * @version 1.0
 */

var redis = require('redis');
var client = redis.createClient();


/**
 * Redis の初期化
 *
 */
client.set('global:room:id', 0, redis.print);
client.flushdb();
client.on('error', function (err) {
    throw err;
});

exports.incrementRoom = function () {
    client.incr('global:room:id');
};

exports.addRoom = function (data) {
    client.rpush('rooms', data);
};

exports.getRoomNumber = function (callback) {
    client.get('global:room:id', function (err, num) {
        callback(num); 
    });
};
