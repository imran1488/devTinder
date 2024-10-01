const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validation");
app.use(express.json());
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
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login successful!!!");
    } else {
      throw new Error("Password Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});
// get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(400).send("No record found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Feed API - GET/feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch {
    res.status(400).send("something went wrong");
  }
});
//Update data of the user
app.patch("/user/:userId", async (req, res) => {
  //const userId = req.body.userId;
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
      "lastName",
      "password",
    ];
    //console.log(data);
    const isUpdateAllowed = Object.keys(data).every((k) => {
      return ALLOWED_UPDATES.includes(k);
    });
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed!");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be greater than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log("User updated successfully");
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED: " + err.message);
  }
});
//Delete a user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    //const user = await User.findByIdAndDelete(userId);
    res.status(200).send("User Deleted successfully");
  } catch (err) {
    res.status(400).send("Not able to find the user by id");
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
