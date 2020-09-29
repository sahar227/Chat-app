const config = require('config');
const logger = require('./libs/logger');
const setUpMiddleWare = require('./libs/setUpMiddleware');
const setUpMongoose = require('./libs/setUpMongoose');

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const auth = require('./middleware/auth');
const setUpPassport = require('./libs/auth/setUpPassport');

const authRouter = require('./routes/auth');

setUpMiddleWare(app);
setUpMongoose();
setUpPassport();


app.use('/api/auth/google', authRouter);


  app.get('/api/test', auth, (req, res) => {
    return res.send('success!');
  });

io.on('connection', (socket) => { socket.emit('sayHi', 'hi') });
const port = config.get('server.port');
server.listen(port, () => logger.info(`Listening on port ${port}`));