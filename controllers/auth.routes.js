const express = require("express");
const adminRouter = express.Router();
const UserModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


adminRouter.post("/registration", async (req, res) => {
  const { firstname,lastname,email,password,role } = req.body;
  const valid = await UserModel.findOne({ email });
  if (valid) {
    res
      .status(400)
      .send({ error: "user Already exists with this email id please" });
  }
  try {
    const hashedPassword=await bcrypt.hash(password,12)
let user=new UserModel({firstname,lastname,email,hashedPassword,role})
      user.save().then((ress) => {
        res.status(200).send({ message: "registartion completed" });
      });
    }
    /////
   catch (er) {
    res.status(400).send({ error: er.message });
  }
});

//login

adminRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;

  const valid = await UserModel.findOne({ email });
  if (!valid) {
    res.status(400).send({
      error: "user doesn't exist with this email id, please do registration",
    });
  }
// console.log(valid.role)
  try {
    bcrypt.compare(password, valid.hashedPassword, (err, decoded) => {
      if (decoded) {
        let token = jwt.sign(
          { userId: valid._id, role: valid.role},
          process.env.JWT_SECRET
        );
        res.status(200).send({ message: "Logged In", token,name:valid.firstname+" "+valid.lastname,role:valid.role});
      } else {
        res.status(400).send({ message: "wrong credentials" });
      }
    });
  } catch (er) {
    res.status(400).send({ error: er.message });
  }
});

module.exports = adminRouter;
