const config = require('config');
const logger = require('./libs/logger');
const setUpMiddleWare = require('./libs/setUpMiddleware');
const setUpMongoose = require('./libs/setUpMongoose');

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

setUpMiddleWare(app);
setUpMongoose();

app.get('/test', (req, res) => {
    return res.send('test');
});

io.on('connection', (socket) => { socket.emit('sayHi', 'hi') });
const port = config.get('server.port');
server.listen(port, () => logger.info(`Listening on port ${port}`));