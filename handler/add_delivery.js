const jwt = require("jsonwebtoken");
const client = require("../config/client");
const add_employer = require("../graphql/add_employee");
const send_email_handler = require("../helper/send_email");
async function add_delivery(req, res) {
  const {
    first_name,
    email,
    last_name,
    campany_name,
    campany_detail,
    phone_number,
    tin_number,
    license,
    manager_id,
    street_address,
    zip_code,
    sub_city_id,
  } = req.body.input?.value;

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
      subject: "Hibirlink + Delivert Company registration",
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
    const add_delivery_result = await client.request(add_employer, {
      object: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        role: "delivery",
        id: email,
        phone_number: phone_number,
        invite_token: token,
        manager_id: manager_id,
        delivery_providers: {
          data: {
            sub_city_id: sub_city_id,
            name: campany_name,
            description: campany_detail,
            street_address: street_address,
            zip_code: zip_code,
            tin_number: tin_number,
            license: license,
          },
        },
      },
    });

    console.log(add_delivery_result);

    return res.json({
      status: 200,
      message: "Delivery Add successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(401);
  }
}

module.exports = add_delivery;
