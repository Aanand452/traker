const dotenv = require('dotenv');

module.exports = {
  development: {
    username: "user",
    password: "pass",
    database: "db",
    host: "postgres",
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
