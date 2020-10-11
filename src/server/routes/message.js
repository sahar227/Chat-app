const router = require("express").Router();
const auth = require("../middleware/auth");
const wrap = require("../middleware/wrap");
const { Message, validateMessage } = require("../models/message");
const { ChatRoom } = require("../models/chatRoom");
const mongoose = require("mongoose");
const notifyNewMessage = require("../socketIO/notifications/notifyNewMessage");

router.get(
  "/:chatid",
  auth,
  wrap(async (req, res) => {
    const chatId = req.params.chatid;
    const messages = await Message.find({
      chatRoom: mongoose.Types.ObjectId(chatId),
    }).populate("author", "name");
    return res.send(messages);
  })
);

router.post(
  "/",
  auth,
  wrap(async (req, res) => {
    const error = validateMessage(req.body);
    if (error) return res.status(400).send(error);
    const chatRoomId = mongoose.Types.ObjectId(req.body.chatroom);
    const chatRoom = await ChatRoom.findById(chatRoomId);
    if (!chatRoom)
      return res.status(404).send("chat room with given id does not exist");
    const message = new Message({
      author: req.user.id,
      content: req.body.content,
      chatRoom: chatRoomId,
    });
    await message.save();

    // send socket notification to all participants in the chat who are logged in
    const messageNotification = {
      _id: message.id,
      author: req.user.id,
      chatRoom: req.body.chatroom,
      content: req.body.content,
      createdAt: message.createdAt,
    };
    for (const participant of chatRoom.participants) {
      notifyNewMessage(participant, messageNotification);
    }

    return res.send(message);
  })
);

module.exports = router;
