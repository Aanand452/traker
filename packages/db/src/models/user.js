import db from '../dbmodels/'
class UserModel {
  static async getAutenticatedUser(usr, pwd) {
    try{
      const user = await db.User.findAll({
        where: {
          username: usr,
          password: pwd
        },
        timestamps: false
      });
      
      return user;
    } catch (err) {
      console.error('Error getting user login', err);
    }
  }

  static async getUserId(usr) {
    try{
      const user = await db.User.findAll({
        where: {
          username: usr
        },
        raw: true
      });
      
      if(user.length > 0 ) return user[0].userId;
      else return null;
    } catch (err) {
      console.error('Error getting user login', err);
    }
  }
}

export default UserModel;