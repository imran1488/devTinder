const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { validateSignUpData } = require("./utils/validation");
const { userAuth } = require("./middlewares/auth");
app.use(express.json());
app.use(cookieParser());
app.post("/signup", async (req, res) => {
  try {
    //Validation of data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    //Encrypt the password
    //const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    //Creating a new instance of user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added sucessfully!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    console.log(user.password);
    //const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //Create JWT Token
      // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
      //   expiresIn: "1d",
      // });
      const token = await user.getJWT();
      console.log(token);
      //Add the token to cookie and send the response back to user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login successful!!!");
    } else {
      throw new Error("Password Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    // const cookies = req.cookies;
    // const { token } = cookies;
    // if (!token) {
    //   throw new Error("Invalid token ceredentials..");
    // }
    // //validate my token
    // const decodedMessage = await jwt.verify(token, "DEV@Tinder$790");

    // const { _id } = decodedMessage;
    // console.log("Loged in user is: " + _id);
    // const user = await User.findById(_id);
    // if (!user) {
    //   throw new Error("User doesnot exist");
    // }
    //console.log("Loged in user first name is: " + user.firstName);
    //console.log(cookies);
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err);
  }
});
// get user by email
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Sending a connection Request");
  res.send(user.firstName + " Sent the connection Request");
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
///Testi@1293
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzAwZjBiZTc2ZmUyZTA5ZDhmN2Q1NjEiLCJpYXQiOjE3MjgxMTUxMTF9.i74vyjkSCIoQFg3XK8-9l0N2-Gc8ZFXfCoJajXN4jck
