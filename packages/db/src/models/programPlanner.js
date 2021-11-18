import db from "../dbmodels";
import { v4 as uuidv4 } from "uuid";
import Activity from "./activity";

class ProgramPlannerModel {
  static getProgramPlanners(program) {
    return new Promise(async (resolve, reject) => {
      try {
        const programPlanner = await db.ProgramPlanner.findAll({
          order: [["program_name", "ASC"]],
        });
        // const result = Promise.all(
        //   programPlanner.map(
        //     async (programApm) => await db.APM1.findByPk(programApm.apm1Id)
        //   )
        // );

        resolve(programPlanner);
      } catch (err) {
        console.error("Error getting program-planners relationship", err);
        reject("Error");
      }
    });
  }

  static filterProgramPlanners(filters) {
    return new Promise(async (resolve, reject) => {
      try {
        const programPlanner = await db.ProgramPlanner.findAll({
          order: [["program_name", "ASC"]],
        });
        console.log(programPlanner);
        // const result = Promise.all(
        //   programPlanner.map(
        //     async (programApm) => await db.APM1.findByPk(programApm.apm1Id)
        //   )
        // );

        resolve(programPlanner);
      } catch (err) {
        console.error("Error getting program-planners relationship", err);
        reject("Error");
      }
    });
  }

  static getProgramPlannerByID(id) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(id);
        let programPlanner = await db.ProgramPlanner.findByPk(id);
        // const result = Promise.all(
        //   programPlanner.map(
        //     async (programApm) => await db.APM1.findByPk(programApm.apm1Id)
        //   )
        // );

        resolve(programPlanner);
      } catch (err) {
        console.error("Error getting program-planners relationship", err);
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

        // let {
        //   offers: { offers },
        // } = body;

        // for (let offer of offers) {
        //   for (let activity of offer.activities) {
        //     let act = await Activity.addNewActivity({
        //       activityId: uuidv4(),
        //       ActivityTitle: "",
        //       date: "",
        //       formatId: "",
        //     });
        //   }
        // }

        let result = await db.ProgramPlanner.create(body);
        // let result = {};

        resolve(result);
      } catch (err) {
        console.error("Error creating program-planner relationship", err);
        reject("Error");
      }
    });
  }

  static updatePlanner(id, bodyParams) {
    return new Promise(async (resolve, reject) => {
      try {
        const body = {
          ...bodyParams,
        };
        // let result = body;

        let result = await db.ProgramPlanner.update(body, {
          where: {
            planner_id: id,
          },
        });

        resolve(result);
      } catch (err) {
        console.error("Error creating program-planner relationship", err);
        reject("Error");
      }
    });
  }

  static deletePlanner(program) {
    return new Promise(async (resolve, reject) => {
      try {
        const planners = await db.ProgramPlanner.findAll({
          where: { planner_id: program },
        });

        const result = planners.map(async (program) => await program.destroy());

        resolve(result);
      } catch (err) {
        console.error("Error deleting program-apm1s", err);
        reject("Error");
      }
    });
  }
}

export default ProgramPlannerModel;
