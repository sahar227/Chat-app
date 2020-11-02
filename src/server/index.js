if (process.env.NODE_ENV !== "production") require("dotenv").config();
const logger = require("./libs/logger");
const path = require('path');

const setUpMiddleWare = require("./libs/setUpMiddleware");
const setUpMongoose = require("./libs/setUpMongoose");
const { setUpSocketIO, getIO } = require("./socketIO/io");
const setUpPassport = require("./libs/auth/setUpPassport");

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const authRouter = require("./routes/auth");
const chatRoomRouter = require("./routes/chatRoom");
const messageRouter = require("./routes/message");
const userRouter = require("./routes/user");

const { User } = require("./models/user");
const userToSockets = require("./libs/userToSocket");

app.use(express.static(path.join(__dirname, "..", "client", "build")));

setUpMiddleWare(app);
setUpSocketIO(io);
setUpMongoose();
setUpPassport();



app.use("/api/auth", authRouter);
app.use("/api/chatroom", chatRoomRouter);
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);

getIO().on("connection", (socket) => {
  socket.on("disconnect", () => {
    userToSockets.removeConnection(socket.id);
  });

  socket.on("authenticate", async (userId) => {
    if (!userId) return socket.emit("authFailed");
    const user = await User.findById(userId);
    if (!user) return socket.emit("authFailed");
    userToSockets.addConnection(userId, socket.id);
    return socket.emit("authSuccess");
  });
  socket.emit("requestAuth");
});

const port = process.env.PORT;
server.listen(port, () => logger.info(`Listening on port ${port}`));
