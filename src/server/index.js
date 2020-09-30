const config = require('config');
const logger = require('./libs/logger');

const setUpMiddleWare = require('./libs/setUpMiddleware');
const setUpMongoose = require('./libs/setUpMongoose');
const setUpPassport = require('./libs/auth/setUpPassport');

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const authRouter = require('./routes/auth');
const chatRoomRouter = require('./routes/chatRoom');
const messageRouter = require('./routes/message');

app.use('/api/auth/google', authRouter);
app.use('/api/chatroom', chatRoomRouter);
app.use('/api/message', messageRouter);

setUpMiddleWare(app);
setUpMongoose();
setUpPassport();

io.on('connection', (socket) => { socket.emit('sayHi', 'hi') });
const port = config.get('server.port');
server.listen(port, () => logger.info(`Listening on port ${port}`));