const express = require("express");
const userAuthRoute = express.Router();
const { login, signup } = require("../controllers/user.auth");

userAuthRoute.post("/register", signup);

userAuthRoute.post("/login", login);

module.exports = { userAuthRoute };
