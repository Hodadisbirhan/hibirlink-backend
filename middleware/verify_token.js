// I will write the code here
const jwt = require("jsonwebtoken");
const verify_token = async (req, res, next) => {
  const { token } = req.body.input.input;
  console.log(token);
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, valid) => {
    if (error) {
      console.log("the token is", error, "_________");
      return res.sendStatus(401);
    } else if (valid) {
      console.log(valid);
      return next();
    }
  });
};

module.exports = verify_token;
