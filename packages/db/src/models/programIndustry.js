import db from '../dbmodels/';
import { v4 as uuidv4 } from 'uuid';

class ProgramIndustryModel {
  static getProgramIndustries(program) {
    return new Promise (async (resolve, reject) => {
      try {
        const programIndustries = await db.ProgramIndustry.findAll({
          where: { program_id: program }
        });

        const result = Promise.all(programIndustries.map(async programInd => await db.Industry.findByPk(programInd.industryId)));

        resolve(result);
      } catch (err) {
        console.error('Error creating program-industry relationship', err);
        reject('Error');
      }
    });
  };

  static addNewProgramIndustry(program, industries) {
    return new Promise (async (resolve, reject) => {
      try {
        const result = industries.map(async industry => {
          const body = {
            programIndustryId: uuidv4(),
            programId: program,
            industryId: industry
          };

          return await db.ProgramIndustry.create(body);
        });

        resolve(result);
      } catch (err) {
        console.error('Error creating program-industry relationship', err);
        reject('Error');
      }
    });
  };

  static removeProgramIndustries(program) {
    return new Promise (async (resolve, reject) => {
      try {
        const programs = await db.ProgramIndustry.findAll({
          where: { program_id: program }
        });

        const result = programs.map(async program => await program.destroy());

        resolve(result);
      } catch (err) {
        console.error('Error deleting program-industry', err);
        reject('Error');
      }
    });
  };
}

export default ProgramIndustryModel;
