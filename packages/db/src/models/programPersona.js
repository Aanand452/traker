import db from '../dbmodels/';
import { v4 as uuidv4 } from 'uuid';

class ProgramPersonaModel {
  static getProgramPersonas(program) {
    return new Promise (async (resolve, reject) => {
      try {
        const programPersonas = await db.ProgramPersona.findAll({
          where: { program_id: program }
        });

        const result = Promise.all(programPersonas.map(async programPer => await db.Persona.findByPk(programPer.personaId)));

        resolve(result);
      } catch (err) {
        console.error('Error creating program-persona relationship', err);
        reject('Error');
      }
    });
  };

  static addNewProgramPersona(program, personas) {
    return new Promise (async (resolve, reject) => {
      try {
        const result = personas.map(async persona => {
          const body = {
            programPersonaId: uuidv4(),
            programId: program,
            personaId: persona
          };

          return await db.ProgramPersona.create(body);
        });

        resolve(result);
      } catch (err) {
        console.error('Error creating program-persona relationship', err);
        reject('Error');
      }
    });
  };

  static removeProgramPersonas(program) {
    return new Promise (async (resolve, reject) => {
      try {
        const programs = await db.ProgramPersona.findAll({
          where: { program_id: program }
        });

        const result = programs.map(async program => await program.destroy());

        resolve(result);
      } catch (err) {
        console.error('Error deleting program-persona', err);
        reject('Error');
      }
    });
  };
}

export default ProgramPersonaModel;
