import db from '../dbmodels/'
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

if(process.env.PORT === '3000') dotenv.config();

class UserModel {
  static async getAutenticatedUser(usr, pass) {
    try{
      const user = await db.User.findAll({
        where: {
          username: usr
        },
        timestamps: false
      });
      
      if(user && pass && process.env.AUTH_KEY && pass === process.env.AUTH_KEY) return user;
      else return 'Error'
    } catch (err) {
      console.error('Error getting user login', err);
    }
  }

  static async getUserId(usr) {
    try{
      const user = await db.User.findAll({
        where: {
          name: usr
        },
        raw: true
      });
      
      //thrown an error or save into log file if the response.length = 0
      if(user.length > 0 ) return user[0].userId;
      else return null;
    } catch (err) {
      console.error('Error getting user login', err);
    }
  }

  static async getUserByEmail(email) {
    try{
      const user = await db.User.findAll({
        where: {
          username: email
        },
        raw: true
      });
      
      if(user.length) return user[0].userId;
      else return false;
    } catch (err) {
      console.error('Error getting user', err);
    }
  }

  static async addNew(body) {
    try{
      body.userId = uuidv4();
      if(!body.userId) throw new Error("It was imposible to create a user due to an id error");

      const user = await db.User.create(body);
      
      return user;
    } catch (err) {
      console.error('Error creating user', err);
      return 'error';
    }
  }
}

export default UserModel;