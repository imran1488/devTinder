const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");
app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
  res.send("User Logged in Successfully");
});
app.use("/user", userAuth, (req, res) => {
  res.send("User Data Sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data sent");
});
app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted all User");
});
app.listen(3001, () => {
  console.log("server is ssucessfully listening on port 3001..");
});
