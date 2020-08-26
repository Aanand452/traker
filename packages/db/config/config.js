const dotenv = require('dotenv');

if(!process.env.PORT) dotenv.config();

console.log(process.env.DB_USER, process.env.DB_PWD, process.env.DB_DB, process.env.DB_HOST);

module.exports = {
  development: {
    username: "user",
    password: "pass",
    database: "db",
    host: process.env.DB_HOST || "postgres",
    dialect: "postgres"
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DB,
    host: process.env.DB_HOST,
    dialect: "postgres"
  },
  stable: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DB,
    host: process.env.DB_HOST,
    dialect: "postgres"
  }
}
