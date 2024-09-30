const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
app.use(express.json());
app.post("/signup", async (req, res) => {
  //console.log(req.body);
  // const userObj = {
  //   firstName: "MS",
  //   lastName: "Dhoni",
  //   emailId: "msdhoni123@gmail.com",
  //   password: "code00ff90",
  // };
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added sucessfully!");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3001, () => {
      console.log("Server is successfully listening on port 3001");
    });
  })
  .catch(() => {
    console.error("Database connection cannot be established");
  });
//  mongodb+srv://imran_1:<db_password>@cluster0.wvgimil.mongodb.net/
//  mongodb+srv://imran_1:<db_password>@cluster0.wvgimil.mongodb.net/
//mongodb+srv://imran_1:eh8PvvMOher8pqX9@cluster0.wvgimil.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 //8BeDssmQmMJYzOhW
