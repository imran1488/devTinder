const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  res.send({
    firstName: "Imran",
    lastname: "Ali",
  });
});
app.use("/test", (req, res) => {
  res.send("Hello namaste from the server");
});
// app.use("/hello", (req, res) => {
//   res.send("Hello Hello Hello Hello......");
// });
//  app.use("/", (req, res) => {
//   res.send("Hello from the dashboard");
// });
app.listen(7777, () => {
  console.log("server is ssucessfully listening on port 7777..");
});
