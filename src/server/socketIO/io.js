const socketIO = require('socket.io');

let io = null
const setUpSocketIO = (ioInstance) => {
    io = ioInstance;
}

const getIO = () => io;

module.exports = {
    getIO,
    setUpSocketIO
};