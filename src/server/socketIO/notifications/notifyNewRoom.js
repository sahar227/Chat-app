const { getIO } = require("../io");
const userToSocket = require("../../libs/userToSocket");

const notifyNewRoom = (userId, payload) => {
  const socketId = userToSocket.getSocketId(userId);
  if (socketId) getIO().to(socketId).emit("new room", payload);
};

module.exports = notifyNewRoom;
