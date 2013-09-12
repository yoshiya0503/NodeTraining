/**
 * @title WebSocket_handler
 * @author Yoshiya Ito <ito_yoshiya@cyberagent.co.jp>
 * @version 1.0
 */

var chatService = require('../models/chatService.js');

exports.connectSockets = function (io) {
    io.sockets.on('connection', function (socket) {
        createRoom(socket);
        enterRoom(socket, function (socket, path) {
            socket.join(path);
            sendMessage(socket, path);
            exitRoom(socket, path);
        });
    });
};

function createRoom(socket) { 
    socket.on('crateRoom', function (data) {
        chatService.incrementRoom();
        chatService.addRoom(data);
        chatService.getRoomNumber(function (num) {
            var room = {
                num : num,
                name : data
            };
            socket.emit('showRoom', room);
            socket.broadcast.emit('showRoom', room);
        });
    });
}

function sendMessage(socket, path) {
    socket.on('createMessage', function (data) {
        chatService.setChatHistory(data.path, data.message, data.username);
        socket.to(path).emit('showMessage',  (data.username + ':' + data.message));
        socket.to(path).broadcast.emit('showMessage', data.username + ':' + data.message);
    });
}

function enterRoom(socket, callback) {
    socket.on('init', function (path) {
        chatService.getChatHistory(path, function (data) {
            socket.to(path).emit('showHistory',data);
        });
        chatService.incrementUser(path);
        console.log(path);
        chatService.getUserNumber(path, function (data) {
            socket.to(path).emit('showUserNumber', data);
            socket.to(path).broadcast.emit('showUserNumber', data);
            socket.to(path).broadcast.emit('enterMessage', '一人入室しました');
            callback(socket, path);
        });
    });
}

function exitRoom(socket, path) {
    socket.on('disconnect', function () {
        socket.to(path).broadcast.emit('exitMessage', '一人消えた!!!');
        chatService.decrementUser(path);
        chatService.getUserNumber(path, function (data) {
            socket.to(path).broadcast.emit('showUserNumber', data);
            if (data === '0') {
                chatService.delRoom(path, function (hoge) {
                    socket.broadcast.emit('deleteRoom',path);
                });
            }
        });
    }); 
}
