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

const getProgramPlannersFiltered = async (req, res) => {
  try {
    const filters = req.body;
    const personas = await ProgramPlanner.filterProgramPlanners(filters);

    ApiUtils.reposeWithhSuccess(res, personas, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      err.toString()
    );
  }
};

const getProgramPlannersByID = async (req, res) => {
  try {
    var id = req.swagger.params.id.value;
    const personas = await ProgramPlanner.getProgramPlannerByID(id);

    ApiUtils.reposeWithhSuccess(res, personas, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      err.toString()
    );
  }
};

const updateProgramPlanner = async (req, res) => {
  try {
    const programId = req.swagger.params.id.value;
    const body = req.body;
    const programToCheck = await ProgramPlanner.getProgramPlannerByID(
      programId
    );
    if (!programToCheck) {
      ApiUtils.reposeWithhSuccess(res, null, httpStatus.NOT_FOUND);
    } else {
      const program = await ProgramPlanner.updatePlanner(programId, body);

      // await ProgramPlanner.logChanges(
      //   programId,
      //   req.body.userId,
      //   programToCheck,
      //   program,
      //   "update"
      // );

      if (program === "error") {
        ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
      } else {
        ApiUtils.reposeWithhSuccess(res, program, httpStatus.OK);
      }
    }
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

const addNewProgramPlanner = async (req, res) => {
  try {
    const programPlanner = await ProgramPlanner.addNewProgramPlanner(req.body);

    if (programPlanner === "error") {
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

const deletePlanner = async (req, res) => {
  try {
    const plannerId = req.swagger.params.id.value;
    const userId = req.body.userId;
    const programToCheck = await ProgramPlanner.getProgramPlannerByID(
      plannerId
    );
    const request = await ProgramPlanner.deletePlanner(plannerId);

    if (request === "error") {
      ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
    } else if (!request) {
      ApiUtils.reposeWithhSuccess(res, null, httpStatus.NOT_FOUND);
    } else {
      ApiUtils.reposeWithhSuccess(res, request, httpStatus.OK);
    }
  } catch (err) {
    ApiUtils.responseWithError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      err.toString()
    );
  }
};

export {
  getAllProgramPlanners,
  getProgramPlannersFiltered,
  getProgramPlannersByID,
  updateProgramPlanner,
  addNewProgramPlanner,
  deletePlanner,
};
