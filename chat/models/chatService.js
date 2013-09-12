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
//client.set('global:room:id', 0, redis.print);
client.setnx('global:user:number', 0, redis.print);
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

exports.setChatHistory = function (roomId, data, username) {
    var key = 'global:' + roomId + 'message';
    client.rpush(key, data, username);
};

exports.getChatHistory = function (roomId, callback) {
    var key = 'global:' + roomId + 'message';
    client.lrange(key, 0, -1, function (err, data) {
        callback(data);
    });
};

exports.incrementUser = function (roomId) {
    var key = 'global:' + roomId + ':number';
    client.setnx(key, 0, redis.print);
    client.incr(key);
};

exports.decrementUser = function (roomId) {
    var key = 'global:' + roomId + ':number';
    client.decr(key);
};

exports.getUserNumber = function (roomId, callback) {
    var key = 'global:' + roomId + ':number';
    client.get(key, function (err, num) {
        callback(num);
    });
};

exports.getRooms = function (callback) {
    client.lrange('rooms', 0, -1, function (err, rooms) {
        callback(rooms);
    });
};

exports.delRoom = function (roomId, callback) {
    var key = 'global:' + roomId + ':number';
    client.del(key, function (err, data) {
        callback(data);
    });
};
