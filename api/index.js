const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const app = express();
const jwt = require("jsonwebtoken");

const salt = bcrypt.genSaltSync(10);
const secret = "ashdauisdhd";

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://mattthomasbryant:1bsUNbxXADNj1zje@mern-blog.xyicslb.mongodb.net/");

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
  } catch (e) {
    res.status(400).json({ message: "Username already taken" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  res.json(passOk);
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.json(token);
    });
    // res.json()
  } else {
    res.status(400).json("Wrong credentials");
  }
});

app.listen(4000);

// 1bsUNbxXADNj1zje
// mongodb+srv://mattthomasbryant:1bsUNbxXADNj1zje@mern-blog.xyicslb.mongodb.net/
