const pkg = require("pg");
const env = require("dotenv").config;
const { Pool } = pkg;

env();

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
  idleTimeoutMillis: 7200,
  ssl: true,
});

module.exports = db;

// user: "maksat",
// host: "dpg-cjfe12gcfp5c73abst0g-a.frankfurt-postgres.render.com",
// database: "sneakersdb",
// password: "sPYAexxEwESUiE5lWMzzGAa4cscRWwva",
