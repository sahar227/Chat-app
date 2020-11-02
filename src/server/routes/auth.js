const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    session: true,
    approvalPrompt: "force",
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: true }),
  (req, res) => {
    return res.redirect(config.get("corsOptions.origin"));
  }
);

router.get('/logout', auth, function(req, res){
  req.logout();
  return res.send('logged out');
});

router.get("/test", auth, (req, res) => {
  return res.send(req.user.id);
});

module.exports = router;
