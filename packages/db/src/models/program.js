import db from '../dbmodels/';

class ProgramModel {
  static async getAllPrograms() {
    try{
      const program = await db.Program.findAll({
        include: db.User
      });
      
      return program;
    } catch (err) {
      console.error('Error getting program list', err);
    }
  }
}

export default ProgramModel;