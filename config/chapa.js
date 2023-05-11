require("dotenv").config({ path: "./.env" });

const CHAPA_AUTH = process.env.CHAPA_AUTH;
const config = {
  headers: {
    Authorization: `Bearer ${CHAPA_AUTH}`,
  },
};

module.exports = config;
