const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://mattthomasbryant:1bsUNbxXADNj1zje@mern-blog.xyicslb.mongodb.net/");

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {const userDoc = await User.create({ username, password });}
    catch (e) {
        res.status(400).json({ message: "Username already taken" });
  }});

app.listen(4000);

// 1bsUNbxXADNj1zje
// mongodb+srv://mattthomasbryant:1bsUNbxXADNj1zje@mern-blog.xyicslb.mongodb.net/
