const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/DigitalLog", { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

let dataString = null; // Initialize an empty string to store the data

User.find({})
  .then((users) => {
    // Convert the array of documents to a JSON string
    dataString = users;
  })
  .catch((err) => {
    console.error("Error:", err);
  });

router.get("/login", (req, res) => {
  res.end(JSON.stringify(dataString));
});

module.exports = {
  router: router,
  User: User,
};
