const client = require("../config/client");
const users_by_token = require("../graphql/fetch_user_by_verify_toke");
const update_verify_token = require("../graphql/update_verify_token");

const verify_user_by_token = async (req, res) => {
  const { token } = req.body.input.input;
  console.log(token);
  try {
    const user = await client.request(users_by_token, { token });
    console.log(user);
    if (user && user.users.length > 0) {
      const { id, email, first_name, last_name } = user.users[0];

      const update_result = await client.request(update_verify_token, { id });
      console.log(update_result);

      if (update_result.update_users_by_pk) {
        return res.json({
          first_name: first_name,
          id: id,
          email: email,
          last_name,
        });
      } else {
        return res.sendStatus(401);
      }
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.log("verify_user_by_token_page:at line 31  ", error);
    return res.sendStatus(401);
  }
};

module.exports = verify_user_by_token;
