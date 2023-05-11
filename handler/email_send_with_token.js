const jwt = require("jsonwebtoken");
const client = require("../config/client");
const add_employer = require("../graphql/add_employee");
const send_email_handler = require("../helper/send_email");

const send_email_message = async (req, res) => {
  const {
    email,
    first_name,
    last_name,
    role,
    phone_number,
    sender_email,
    manager_id,
  } = req.body.input.value;

  //{
  //   email: "hodadisbirhan80@gmail.com",
  //   first_name: "Hodadis",
  //   last_name: "mesha",
  //   sender_id: 4,
  //   sender_email: "hodadisbirhan80@gmail.com",
  //   role: "employee",
  //   phone: "98392789",
  // };

  
  console.log(email, sender_email);
  const now_date = new Date();
  console.log(now_date.getDate());
  now_date.setDate(now_date.getDate() + 3);
  console.log(now_date);

  const token = jwt.sign(
    { email: email, name: first_name },
    process.env.TOKEN_SECRET_KEY,
    { expiresIn: "3 days" }
  );

  try {
    const result = await send_email_handler({
      from: sender_email,
      to: email,
      subject: "Hibirlink Account Invitation",
      html: `<html>
<head></head>

<body style="padding:2rem 2rem 2rem 2rem; display:flex; background-color:lightblue; flex-direction: column; justify-items: center;
align-items: center; gap: 3rem;
">
<h1 style="color:blue">HibirLink Account </h1>
<p>Hello ${first_name} ${last_name}.<br> You are Invited to do  create account through clicking create account button</p>
<span>It will Expire on ${now_date}</span>

<a href=${process.env.SUPPLIER_APP_DOMAIN}/auth/setUpAccount?token=${token} style="background-color:blue; box-shadow: 1px 1px 0px 0px rgba(255, 255, 255, 0.0.);  font-weight: bold; text-decoration:none; color:white; padding:5px 7px;  border-radius: 5px;">Create Account</a>

</body>

<html>

`,
    });

    const add_employer_result = await client.request(add_employer, {
      object: {
        id: email,
        email: email,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        invite_token: token,
        manager_id: manager_id,
        role: role,
      },
    });

    return res.json({ message: "success", status: 200 });
  } catch (err) {
    console.log(err);

    return res.sendStatus(400);
  }
};

module.exports = send_email_message;
