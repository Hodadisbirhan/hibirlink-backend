const jwt = require("jsonwebtoken");
const client = require("../config/client");
const add_driver_mutation = require("../graphql/add_driver_gql");
const send_email_handler = require("../helper/send_email");
const add_driver_handler = async (req, res) => {
  const { email, first_name, last_name, phone_number, driver } =
    req.body.input.value;
  console.log(driver);
  const token = jwt.sign(
    { email: email, name: first_name, last_name },
    process.env.TOKEN_SECRET_KEY,
    { expiresIn: "3 days" }
  );

  const now_date = new Date();
  console.log(now_date.getDate());
  now_date.setDate(now_date.getDate() + 3);

  try {
    const result = await send_email_handler({
      from: "hodadisbirhan80@gmail.com",
      to: email,
      subject: "Hibirlink + ride registration",
      html: `<html>
<head></head>

<body style="padding:2rem 2rem 2rem 2rem; display:flex; background-color:lightblue; flex-direction: column; justify-items: center;
align-items: center; gap: 3rem;
">
<h1 style="color:blue">HibirLink + Ride Account </h1>
<p>Hello ${first_name} ${last_name}.<br> You are Invited to do  create account through clicking  create account button</p>
<span>It will Expire on ${now_date}</span>

<a href=${process.env.SUPPLIER_APP_DOMAIN}/auth/setUpAccount?token=${token} style="background-color:blue; box-shadow: 1px 1px 0px 0px rgba(255, 255, 255, 0.0.);  font-weight: bold; text-decoration:none; color:white; padding:5px 7px;  border-radius: 5px;">Create Account</a>

</body>

<html>

`,
    });
    console.log(email);
    const add_driver_result = await client.request(add_driver_mutation, {
      object: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        role: "driver",
        id: email,
        phone_number: phone_number,
        invite_token:token
      },
      driver: {
        id: email,
        car_name: driver.car_name,
        license: driver.license,
        platelate_number: driver.platelate_number,
        worked_at: driver.worked_at,
      },
    });

    console.log(add_driver_result);

    return res.json({
      status: 200,
      message: "Driver Add successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(401);
  }

  //return res.json({ message: "here is your ID" + token, status: 200 });
};

module.exports = add_driver_handler;
