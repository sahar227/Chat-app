const router = require("express").Router();
const auth = require("../middleware/auth");
const wrap = require("../middleware/wrap");
const { User, validate } = require("../models/user");

router.post(
  "/",
  wrap(async (req, res) => {
    const error = validate(req.body);
    if (error) return res.status(400).send(error);
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).send("User with given email was not found");
    return user;
  })
);

module.exports = router;
