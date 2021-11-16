const app = require("express")();
const PORT = process.env.PORT || 3000;

// Import routes
const authRoutes = require("./routes/auth");

app.use("/app/user", authRoutes);
app.get("/", (req, res) => {
  res.send({
    msg: "Hello there this app is working totally fine",
    route: "/app/user/register",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
