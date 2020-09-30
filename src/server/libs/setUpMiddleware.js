const config = require('config');
const helmet = require('helmet');
const cors = require('cors');
const corsOptions = config.get('corsOptions');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.use(cors(corsOptions));
    app.use(helmet());
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(passport.initialize());
}