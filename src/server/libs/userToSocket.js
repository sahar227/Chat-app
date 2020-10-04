const userIdToSocket = {};

const addConnection = (userId, socketId) => {
    userIdToSocket.userId = socketId;
}

const removeConnection = (userId) => {
    userIdToSocket.userId = undefined;
}

const getSocketId = (userId) => {
    return userIdToSocket.userId;
}

module.exports = {
    addConnection,
    removeConnection,
    getSocketId
};