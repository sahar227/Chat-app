const mongoose = require('mongoose');
const config = require('config');

module.exports = async () => {
    await mongoose.connect(config.get('mongo.connection_string'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });
}