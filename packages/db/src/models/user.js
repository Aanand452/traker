import User from '../dbmodels/user';
import db from '../dbmodels/'

class UserModel {
  static async getAutenticatedUser(usr, pwd) {
    try{
      const user = await db.User.findAll({
        where: {
          username: usr,
          password: pwd
        },
        include: [
          { model: db.Program }
        ],
        timestamps: false
      });
      
      return user;
    } catch (err) {
      console.error('Error getting user login', err);
    }
  }
}

export default UserModel;