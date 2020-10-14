const router = require("express").Router();
const auth = require("../middleware/auth");
const wrap = require("../middleware/wrap");
const { ChatRoom, validateChatRoom } = require("../models/chatRoom");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const notifyNewRoom = require("../socketIO/notifications/notifyNewRoom");

router.get(
  "/",
  auth,
  wrap(async (req, res) => {
    const user = await User.findById(req.user.id).populate("chats");
    return res.send(user.chats);
  })
);

router.post(
  "/",
  auth,
  wrap(async (req, res) => {
    const error = validateChatRoom(req.body);
    if (error) {
      return res.status(400).send(error);
    }
    const participants = [
      ...new Set(req.body.participants),
    ].map((participantId) => mongoose.Types.ObjectId(participantId));
    participants.push(req.user.id);
    const chatRoom = new ChatRoom({
      roomName: req.body.roomName,
      participants,
    });
    await chatRoom.save();
    req.user.chats.push(chatRoom);
    await req.user.save();

    const notificationData = {
      _id: chatRoom._id,
      roomName: chatRoom.roomName,
    };
    notifyNewRoom(req.user._id, notificationData);
    for (const participantId of participants) {
      if (participantId.toString() === req.user._id.toString()) continue;
      const user = await User.findById(participantId);
      user.chats.push(chatRoom);
      await user.save();
      notifyNewRoom(user._id, notificationData);
    }
    return res.status(200).send(chatRoom);
  })
);

module.exports = router;
