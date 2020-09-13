const config = require('config');
const helmet = require('helmet');
const cors = require('cors');
const corsOptions = config.get('corsOptions');

module.exports = (app) => {
    app.use(cors(corsOptions));
    app.use(helmet());
}