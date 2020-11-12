import db from '../dbmodels/';
import { v4 as uuidv4 } from 'uuid';

class ProgramLifecycleModel {
  static getProgramLifecycles(program) {
    return new Promise (async (resolve, reject) => {
      try {
        const programLifecycles = await db.ProgramLifecycle.findAll({
          where: { program_id: program }
        });
        const result = Promise.all(programLifecycles.map(async programLifecycle => await db.LifecycleStage.findByPk(programLifecycle.lifecycleId)));

        resolve(result);
      } catch (err) {
        console.error('Error creating program-lifecycle relationship', err);
        reject('Error');
      }
    });
  };

  static addNewProgramLifecycles(program, lifecycles) {
    return new Promise (async (resolve, reject) => {
      try {
        const result = lifecycles.map(async lifecycle => {
          const programLifecycleId = uuidv4();
          const body = {
            programLifecycleId,
            programId: program,
            lifecycleId: lifecycle
          };
  
          return await db.ProgramLifecycle.create(body);
        });

        resolve(result);
      } catch (err) {
        console.error('Error creating program-lifecycle relationship', err);
        reject('Error');
      }
    });
  };

  static removeProgramLifecycles(program) {
    return new Promise (async (resolve, reject) => {
      try {
        const programs = await db.ProgramLifecycle.findAll({
          where: { program_id: program }
        });

        const result = programs.map(async program => await program.destroy());

        resolve(result);
      } catch (err) {
        console.error('Error deleting program-lifecycle', err);
        reject('Error');
      }
    });
  };
}

export default ProgramLifecycleModel;