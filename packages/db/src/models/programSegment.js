import db from '../dbmodels/';
import { v4 as uuidv4 } from 'uuid';

class ProgramSegmentModel {
  static getProgramSegments(program) {
    return new Promise (async (resolve, reject) => {
      try {
        const programSegments = await db.ProgramSegment.findAll({
          where: { program_id: program }
        });

        const result = Promise.all(programSegments.map(async programSeg => await db.Segment.findByPk(programSeg.segmentId)));

        resolve(result);
      } catch (err) {
        console.error('Error creating program-segment relationship', err);
        reject('Error');
      }
    });
  };

  static addNewProgramSegment(program, segments) {
    return new Promise (async (resolve, reject) => {
      try {
        const result = segments.map(async segment => {
          const body = {
            programSegmentId: uuidv4(),
            programId: program,
            segmentId: segment
          };

          return await db.ProgramSegment.create(body);
        });

        resolve(result);
      } catch (err) {
        console.error('Error creating program-segment relationship', err);
        reject('Error');
      }
    });
  };

  static removeProgramSegments(program) {
    return new Promise (async (resolve, reject) => {
      try {
        const programs = await db.ProgramSegment.findAll({
          where: { program_id: program }
        });

        const result = programs.map(async program => await program.destroy());

        resolve(result);
      } catch (err) {
        console.error('Error deleting program-sements', err);
        reject('Error');
      }
    });
  };
}

export default ProgramSegmentModel;
