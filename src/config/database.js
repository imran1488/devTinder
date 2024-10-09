// mongodb cluster0 user => imran_1:O3h1ZA9CpMqorFlD
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://imran_1:znSr1aWn4qKmg6ir@cluster0.wvgimil.mongodb.net/devTinder"
  );
};

//const connectDB = connect();
module.exports = connectDB;
// znSr1aWn4qKmg6ir ----> Password
//mongodb+srv://imran_1:znSr1aWn4qKmg6ir@cluster0.wvgimil.mongodb.net/devTinder
