import * as Sequelize from 'sequelize'
import fs from 'fs';
import config from '../config/config';

let env = process.env.NODE_ENV || 'development'; 

const db = config[env].database
const username = config[env].username;
const password = config[env].password
const host = config[env].host

export const sequelize = new Sequelize.Sequelize(db, username, password, {
  dialect: "postgres",
  port: 5432,
  host: host || 'postgres',
  define: {
    timestamps: false
  },
});

sequelize.authenticate().then(data => {
  console.info('sucesss');
}).catch(err => {
  console.error('Error connecting to db', err);
});