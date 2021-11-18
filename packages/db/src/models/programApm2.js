import db from '../dbmodels/';
import { v4 as uuidv4 } from 'uuid';

class ProgramApm2Model {
  static getProgramApm2s(program) {
    return new Promise (async (resolve, reject) => {
      try {
        const programApms = await db.ProgramApm2.findAll({
          where: { program_id: program }
        });
        const result = Promise.all(programApms.map(async programApm => await db.APM2.findByPk(programApm.apm2Id)));

        resolve(result);
      } catch (err) {
        console.error('Error creating program-apm2 relationship', err);
        reject('Error');
      }
    });
  };

  static addNewProgramApm2s(program, apm2s) {
    return new Promise (async (resolve, reject) => {
      try {
        const result = apm2s.map(async apm2 => {
          const programApm2Id = uuidv4();
          const body = {
            programApm2Id,
            programId: program,
            apm2Id: apm2
          };
  
          return await db.ProgramApm2.create(body);
        });

        resolve(result);
      } catch (err) {
        console.error('Error creating program-apm2 relationship', err);
        reject('Error');
      }
    });
  };

  static removeProgramApm2s(program) {
    return new Promise (async (resolve, reject) => {
      try {
        const programs = await db.ProgramApm2.findAll({
          where: { program_id: program }
        });

        const result = programs.map(async program => await program.destroy());

        resolve(result);
      } catch (err) {
        console.error('Error deleting program-apm2s', err);
        reject('Error');
      }
    });
  };
}

export default ProgramApm2Model;