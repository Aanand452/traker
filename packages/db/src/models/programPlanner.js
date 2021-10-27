import db from "../dbmodels";
import { v4 as uuidv4 } from "uuid";

class ProgramPlannerModel {
  static getProgramPlanners(program) {
    return new Promise(async (resolve, reject) => {
      try {
        const programPlanner = await db.ProgramPlanner.findAll({
          where: { program_id: program },
        });
        const result = Promise.all(
          programPlanner.map(
            async (programApm) => await db.APM1.findByPk(programApm.apm1Id)
          )
        );

        resolve(result);
      } catch (err) {
        console.error("Error creating program-apm1 relationship", err);
        reject("Error");
      }
    });
  }

  static addNewProgramPlanner(bodyParams) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("22");
        const ProgramPlannerId = uuidv4();
        const body = {
          ProgramPlannerId,
          ...bodyParams,
        };
        // let result = body;
        console.log(body);
        let result = await db.ProgramPlanner.create(body);
        console.log(result);

        resolve(result);
      } catch (err) {
        console.error("Error creating program-planner relationship", err);
        reject("Error");
      }
    });
  }

  static removeProgramPlanners(program) {
    return new Promise(async (resolve, reject) => {
      try {
        const programs = await db.ProgramPlanner.findAll({
          where: { program_id: program },
        });

        const result = programs.map(async (program) => await program.destroy());

        resolve(result);
      } catch (err) {
        console.error("Error deleting program-apm1s", err);
        reject("Error");
      }
    });
  }
}

export default ProgramPlannerModel;
