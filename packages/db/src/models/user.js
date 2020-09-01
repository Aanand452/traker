import User from '../dbmodels/user';

class UserModel {
  static async getAutenticatedUser(usr, pwd) {
    try{
      const user = await User.findAll({
        where: {
          username: usr,
          password: pwd
        }
      });
      return user.length;
    } catch (err) {
      console.error('Error getting user login', err);
    }
  }
}

export default UserModel;