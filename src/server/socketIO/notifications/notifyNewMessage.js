const getIO = require('../io');
const userToSocket = require('../../libs/userToSocket');

const notifyNewMessage = (userId, payload) => {
    const socketId = userToSocket.getSocketId(userId);
    if(socketId)
        getIO().to(socketId).emit('new message', payload);
}

module.exports = notifyNewMessage