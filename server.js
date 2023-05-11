const express = require("express");
const router = require("./router");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());
app.set("view engine", "ejs");
app.use("/", router);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("the Server is listen  at the port " + port);
});
