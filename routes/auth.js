const router = require("express").Router();
const User = require("../models/User");

router.get("/register", (req, res) => {
  console.log("Reached Route");
  res.send("try to send a post request");
});
router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch {
    res.status(404).send("Error");
  }
});

module.exports = router;
