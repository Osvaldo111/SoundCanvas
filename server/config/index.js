const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "soundcanvas",
  password: "123",
  port: "5432"
});
module.exports = client;
