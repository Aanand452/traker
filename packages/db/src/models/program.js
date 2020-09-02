import Program from '../dbmodels/program';

class ProgramModel {
  static async getAllPrograms() {
    try{
      const program = await Program.findAll({attributes: ['program_id', ['name', 'label']]});
      
      return program;
    } catch (err) {
      console.error('Error getting program list', err);
    }
  }
}

export default ProgramModel;