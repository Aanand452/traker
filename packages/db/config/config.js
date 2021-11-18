const dotenv = require('dotenv');

if(!process.env.PORT) dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USER || "user",
    password: process.env.DB_PWD || "pass",
    database: process.env.DB_DB || "db",
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
