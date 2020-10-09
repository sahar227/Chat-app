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
    session: false,
    approvalPrompt: "force",
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    jwt.sign(
      { userId: req.user.id },
      config.get("jwtAuth.secret"),
      { expiresIn: "60 min" },
      (err, token) => {
        if (err) {
          res.sendStatus(500);
        } else {
          res.cookie("jwt", token).redirect(config.get("corsOptions.origin"));
        }
      }
    );
  }
);

router.get("/test", auth, (req, res) => {
  return res.send(req.user);
});

module.exports = router;
