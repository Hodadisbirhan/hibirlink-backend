require("dotenv").config({ path: "./.env" });

const CHAPA_AUTH = "CHASECK_TEST-U4bnXzJF2Iw4Pi2xxqsU20zVMn1y6PmM";
const config = {
  headers: {
    Authorization: `Bearer ${CHAPA_AUTH}`,
  },
};

module.exports = config;
