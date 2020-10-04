const config = require('config');
const logger = require('./libs/logger');

const setUpMiddleWare = require('./libs/setUpMiddleware');
const setUpMongoose = require('./libs/setUpMongoose');
const { setUpSocketIO, getIO } = require('./socketIO/io');
const setUpPassport = require('./libs/auth/setUpPassport');

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const authRouter = require('./routes/auth');
const chatRoomRouter = require('./routes/chatRoom');
const messageRouter = require('./routes/message');

const jwt = require('jsonwebtoken');
const {User} = require('./models/user');
const userToSockets = require('./libs/userToSocket');

app.use('/api/auth/google', authRouter);
app.use('/api/chatroom', chatRoomRouter);
app.use('/api/message', messageRouter);

setUpMiddleWare(app);
setUpSocketIO(io);
setUpMongoose();
setUpPassport();

getIO().on('connection', (socket) => { 
    socket.on('disconnect', () => {
        userToSockets.removeConnection(socket.id)
    });

    socket.on('authenticate', async (token) => {
        if(!token)
            return socket.emit('authFailed');
        const userId = jwt.verify(token, config.get('jwtAuth.secret')).userId;
        const user = await User.findById(userId);
        if(!user)
            return socket.emit('authFailed');
        userToSockets.addConnection(userId, socket.id);
        return socket.emit('authSuccess');
    
    });
    socket.emit('requestAuth') 
});

const port = config.get('server.port');
server.listen(port, () => logger.info(`Listening on port ${port}`));