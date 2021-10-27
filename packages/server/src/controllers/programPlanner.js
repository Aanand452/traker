import ApiUtils from "@sara/common/src/api/ApiUtils";
import httpStatus from "http-status-codes";
import ProgramPlanner from "@sara/db/src/models/programPlanner";

const getAllProgramPlanners = async (req, res) => {
  try {
    const personas = await ProgramPlanner.getProgramPlanners();

    ApiUtils.reposeWithhSuccess(res, personas, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      err.toString()
    );
  }
};

const addNewProgramPlanner = async (req, res) => {
  try {
    console.log("@@");
    const programPlanner = await ProgramPlanner.addNewProgramPlanner(req.body);

    if (programPlanner === "error") {
      console.log("@@", res);
      ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
    } else ApiUtils.reposeWithhSuccess(res, programPlanner, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      err.toString()
    );
  }
};

export { getAllProgramPlanners, addNewProgramPlanner };
