import * as Sequelize from 'sequelize'
import fs from 'fs';

let raw = fs.readFileSync(__dirname + '/../config/config.json', 'utf8');
let config = JSON.parse(raw);
let env = process.env.NODE_ENV || 'development'; 

const db = 'db'
const username = process.env.DB_PWD || config[env].username;
const password = process.env.DB_USER || config[env].password
const host = process.env.DB_HOST || config[env].host

console.log('LOG: ', env, db, username, password, host);

export const sequelize = new Sequelize.Sequelize(db, username, password, {
  dialect: "postgres",
  port: 5432,
  host: host || 'postgres'
});


sequelize.authenticate().then(data => {
  console.info('sucesss');
}).catch(err => {
  console.error('Error connecting to db', err);
});