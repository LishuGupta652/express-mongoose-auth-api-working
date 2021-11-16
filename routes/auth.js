const router = require("express").Router();

router.get("/register", (req, res) => {
  console.log("Reached Route");
  res.send("try to send a post request");
});
router.post("/register", (req, res) => {
  console.log("Registered");
  res.send("Registered");
});

module.exports = router;
