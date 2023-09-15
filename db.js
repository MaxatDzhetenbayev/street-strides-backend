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
