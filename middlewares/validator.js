const jwt = require("jsonwebtoken");
require("dotenv").config();

const validator = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: err });
      }

      req.body.userId = decoded.id;
      next();
    });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

module.exports = { validator };
