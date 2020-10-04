const userIdToSocket = {};
const socketToUserId = {};

const addConnection = (userId, socketId) => {
    userIdToSocket[userId] = socketId;
    socketToUserId[socketId] = userId;
}

const removeConnection = (socketId) => {
    const userId = socketToUserId[socketId];
    userIdToSocket[userId] = undefined;
    socketToUserId[socketId] = undefined;
}

const getSocketId = (userId) => {
    return userIdToSocket[userId];
}

const getUserId = (socketId) => {
    return socketToUserId[socketId];
}

module.exports = {
    addConnection,
    removeConnection,
    getSocketId
};