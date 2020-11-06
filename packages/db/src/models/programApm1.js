import db from '../dbmodels/';
import { v4 as uuidv4 } from 'uuid';

class ProgramApm1Model {
  static getProgramApm1s(program) {
    return new Promise (async (resolve, reject) => {
      try {
        const programApms = await db.ProgramApm1.findAll({
          where: { program_id: program }
        });
        const result = Promise.all(programApms.map(async programApm => await db.APM1.findByPk(programApm.apm1Id)));

        resolve(result);
      } catch (err) {
        console.error('Error creating program-apm1 relationship', err);
        reject('Error');
      }
    });
  };

  static addNewProgramApm1s(program, apm1s) {
    return new Promise (async (resolve, reject) => {
      try {
        const result = apm1s.map(async apm1 => {
          const programApm1Id = uuidv4();
          const body = {
            programApm1Id,
            programId: program,
            apm1Id: apm1
          };
  
          return await db.ProgramApm1.create(body);
        });

        resolve(result);
      } catch (err) {
        console.error('Error creating program-apm1 relationship', err);
        reject('Error');
      }
    });
  };

  static removeProgramApm1s(program) {
    return new Promise (async (resolve, reject) => {
      try {
        const programs = await db.ProgramApm1.findAll({
          where: { program_id: program }
        });

        const result = programs.map(async program => await program.destroy());

        resolve(result);
      } catch (err) {
        console.error('Error deleting program-apm1s', err);
        reject('Error');
      }
    });
  };
}

export default ProgramApm1Model;