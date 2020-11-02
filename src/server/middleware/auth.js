module.exports = (req, res, next) => {  
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).json({
        message: 'must be logged in to continue',
      });
    }
  };