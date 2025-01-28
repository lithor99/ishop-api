const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  const splitToken = token.split(" ");
  if (splitToken[0] !== "Bearer") {
    return res.status(403).send({ message: "Invalid token format!" });
  }
  if (!jwt.verify(splitToken[1], process.env.SECRET_KEY)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
  next();
};
