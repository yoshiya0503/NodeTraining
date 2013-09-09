/**
 * @title WebSocket_handler
 * @author Yoshiya Ito <ito_yoshiya@cyberagent.co.jp>
 * @version 1.0
 */

var chatService = require('../models/chatService.js');

exports.connectSocket = function (io) {
    io.sockets.on('connection', function (socket) {
        createRoom(socket);
        sendMessage(socket);
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

function sendMessage(socket) {
    socket.on('createMessage', function (data) {
        socket.emit('showMessage', data);
        socket.broadcast.emit('showMessage', data);
    });
}
