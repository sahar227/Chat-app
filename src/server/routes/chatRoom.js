const router = require('express').Router();
const auth = require('../middleware/auth');
const {ChatRoom, validateChatRoom} = require('../models/chatRoom')
const {User} = require('../models/user')
const mongoose = require('mongoose');

router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user.id).populate('chats');
    return res.send(user.chats);
});

router.post('/', auth, async (req, res) => {
    const error = validateChatRoom(req.body);
    if(error) {
        return res.status(403).send(error);
    }
    const chatRoom = new ChatRoom({roomName: req.body.roomName});
    await chatRoom.save();
    req.user.chats.push(chatRoom);
    await req.user.save();
    for(const participantId of req.body.participants) {
        if(participantId === req.user.id.toString())
            continue;
        const user = await User.findById(mongoose.Types.ObjectId(participantId));
        user.chats.push(chatRoom);
        user.save();
    }
    return res.status(200).send(chatRoom);
});

module.exports = router;