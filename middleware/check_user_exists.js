const client = require("../config/client");
const users_by_email = require("../graphql/fetch_user_by_email");

const user_exist_checker = async (req, res, next) => {
  const { email } = req.body.input.value;

  try {
    const result = await client.request(users_by_email, { email });
    if (result && result.users.length > 0) {
      return res.json({ message: "email already exists", status: 400 });
    }

    return next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

module.exports = user_exist_checker;
