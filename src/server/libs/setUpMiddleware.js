const config = require("config");
const helmet = require("helmet");
const cors = require("cors");
const corsOptions = config.get("corsOptions");
corsOptions.origin = process.env.CORS_ORIGIN;
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require('express-session');
const error = require("../middleware/error");

module.exports = (app) => {
  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(session({  
    secret: process.env.SESSION_SECRET || 'default_session_secret',
    resave: false,
    saveUninitialized: false,
  }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(error);
};
