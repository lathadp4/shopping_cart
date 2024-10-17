const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  const token = req.get("authorization");

  if (!token) {
    return res.status(401).send({
      auth: false,
      message: "Failed to authenticate token.",
    });
  }

  const verifyToken = token.slice(7); // Remove "Bearer " prefix from the token

  jwt.verify(verifyToken, process.env.refreshKey, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({
          auth: false,
          message: "Token has expired.",
        });
      } else {
        return res.status(401).send({
          auth: false,
          message: "Failed to authenticate token.",
        });
      }
    } else {
      console.log("Token verification successful");
      next();
    }
  });
}

module.exports = {
  verifyToken,
};
