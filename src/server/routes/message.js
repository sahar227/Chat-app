const router = require('express').Router();
const auth = require('../middleware/auth');
const { Message, validateMessage } = require('../models/message');
const {ChatRoom} = require('../models/chatRoom')
const mongoose = require('mongoose');

router.get('/:chatid', auth, async (req, res) => {
    const chatId = req.params.chatid;
    const messages = await Message.find({chatRoom: mongoose.Types.ObjectId(chatId)}).populate('author', 'name');
    return res.send(messages);
});

router.post('/', auth, async (req, res) => {
    const error = validateMessage(req.body);
    if(error)
        return res.status(400).send(error);
    const chatRoomId = mongoose.Types.ObjectId(req.body.chatroom);
    const chatRoom = await ChatRoom.findById(chatRoomId);
    if(!chatRoom)
        return res.status(404).send('chat room with given id does not exist');
    const message = new Message({author: req.user.id, content: req.body.content, chatRoom: chatRoomId});
    await message.save();
    return res.send(message);
});

module.exports = router;