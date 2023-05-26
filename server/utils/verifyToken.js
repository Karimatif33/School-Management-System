const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return jwt.verify(token, "soon", (err, decode) => {
    if (err) {
      return  false
    } else {
      return decode;
    }
  });
};
module.exports = verifyToken;
