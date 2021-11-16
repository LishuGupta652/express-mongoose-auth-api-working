const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const env = require("dotenv").config();
// Import routes
const authRoutes = require("./routes/auth");

// Connnect to Database using mongoose
mongoose.connect(process.env.MONGODB_URI, () => {
  console.log("Connected to Db");
});

// MiddleWare to use json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/app/user", authRoutes);
// Index Route
app.get("/", (req, res) => {
  res.send({
    msg: "Hello there this app is working totally fine",
    route: "/app/user/register",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
