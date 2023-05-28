const jwt = require("jsonwebtoken");

const superadminVerify = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (decoded.role == "superadmin") {
        next();
      } else {
        res.status(400).send({ error: err });
      }
    });
  } else {
    res.status(400).send({ error: "unauthorized access" });
  }
};

module.exports = superadminVerify;
