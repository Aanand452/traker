import * as Sequelize from 'sequelize'
import fs from 'fs';
import config from '../config/config';

let env = process.env.NODE_ENV || 'development'; 

const db = process.env.DB_DB || 'db'
const username = process.env.DB_USER || config[env].username;
const password = process.env.DB_PWD || config[env].password
const host = process.env.DB_HOST || config[env].host
let options = {
  dialect: "postgres",
  port: 5432,
  host: host || 'postgres'
}

export const sequelize = new Sequelize.Sequelize(db, username, password, options);

sequelize.authenticate().then(data => {
  console.info('sucesss');
}).catch(err => {
  console.error('Error connecting to db', err);
});