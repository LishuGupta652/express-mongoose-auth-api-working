const router = require("express").Router();
const User = require("../models/User");
const { loginValidation, registerValidation } = require("../validation");
const bcrypt = require("bcrypt");

router.get("/register", (req, res) => {
  console.log("Reached Route");
  res.send("try to send a post request");
});
router.post("/register", async (req, res) => {
  // Validate the data
  const { error, value } = registerValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  // Check if the user already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  // Hash the password
  // It took me a while to figure out how to do this.
  // Salt must be integer and bcrypt is responding with a string
  const salt = bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, parseInt(salt));

  // Create New User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: savedUser._id });
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

router.post("/login", async (req, res) => {
  // Validate the data
  const { error, value } = loginValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(400).send("Email or password is wrong");
  }

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    res.status(400).send("Email or password is wrong");
  }
  res.send("logged in ");
});

module.exports = router;
