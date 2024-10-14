// mongodb cluster0 user => imran_1:O3h1ZA9CpMqorFlD
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://imran_1:XfFwbBDjm8Dy5Gz4@cluster0.wvgimil.mongodb.net/devTinder"
  );
};

//const connectDB = connect();
module.exports = connectDB;
// XfFwbBDjm8Dy5Gz4 ----> Password
//mongodb+srv://imran_1:XfFwbBDjm8Dy5Gz4@cluster0.wvgimil.mongodb.net/devTinder
