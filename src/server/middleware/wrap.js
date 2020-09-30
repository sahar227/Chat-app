const logger = require('../libs/logger');

module.exports = wrap = fn => (...args) => {
    
    return fn(...args).catch((error) => {
        logger.error(error);
        throw(error);
    })
};