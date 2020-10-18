const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
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
      process.env.JWT_SECRET,
      { expiresIn: "60 min" },
      (err, token) => {
        if (err) {
          return res.sendStatus(500);
        } else {
          const htmlWithEmbeddedJWT = `
          <html>
            <script>
              // Save JWT to localStorage
              window.localStorage.setItem('JWT', '${token}');
              // Redirect browser to root of application
              window.location.href = '${process.env.CORS_ORIGIN}';
            </script>
          </html>
          `;

          return res.send(htmlWithEmbeddedJWT);
        }
      }
    );
  }
);

router.get("/test", auth, (req, res) => {
  return res.send(req.user);
});

module.exports = router;
