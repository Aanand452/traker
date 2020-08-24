const dotenv = require('dotenv');
const result = dotenv.config()

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
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DB,
    host: process.env.DB_HOST,
    dialect: "postgres"
  }
}
