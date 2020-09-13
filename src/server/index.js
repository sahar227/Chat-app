const config = require('config');

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');

mongoose.connect(config.get('mongo.connection_string'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.get('/test', (req, res) => {
    return res.send('test');
});

io.on('connection', () => { /* … */ });
const port = config.get('server.port');
server.listen(port, () => console.log(`Listening on port ${port}`));