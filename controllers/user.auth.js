const bcrypt = require("bcrypt");
require("dotenv").config();
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    let userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(409).json({
        message:
          "The email address you are trying to register is already in use. Please choose a different email address.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({
      firstname,
      lastname,
      email,
      role: "user",
      hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "Registration Successfull" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      const {
        _id: id,
        firstname,
        lastname,
        email,
        role,
        hashedPassword,
      } = userExist;
      const isCorrect = await bcrypt.compare(password, hashedPassword);
      if (!isCorrect) {
        return res.status(401).json({ message: "Incorrect Password" });
      } else {
        jwt.sign(
          { id, firstname, lastname, email, role },
          process.env.JWT_SECRET,
          {
            expiresIn: "3d",
          },
          (err, token) => {
            if (err) {
              return res.status(500).json({ message: err });
            }
            res.status(200).json({
              message: "Login Successfull",
              token,
              userData: { id, firstname, lastname, email, role },
            });
          }
        );
      }
    } else {
      return res.status(404).json({
        message: "User not found. Please check your email and try again.",
      });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = { login, signup };
