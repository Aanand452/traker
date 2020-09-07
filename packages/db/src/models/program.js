import db from '../dbmodels/';

class ProgramModel {
  static async getAllPrograms() {
    try{
      const program = await db.Program.findAll({attributes: ['program_id', ['name', 'label']]});
      
      return program;
    } catch (err) {
      console.error('Error getting program list', err);
    }
  }

  static async getAllProgramsFull() {
    try{
      const program = await db.Program.findAll({
        include: [db.User, db.Region]
      });
      
      return program;
    } catch (err) {
      console.error('Error getting program list', err);
    }
  }
}

export default ProgramModel;