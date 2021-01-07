import ApiUtils from '@sara/common/src/api/ApiUtils';
import httpStatus from 'http-status-codes';
import ProgramModel from '@sara/db/src/models/program';

const getPrograms = async (req, res) => {
  try {
    const programs = await ProgramModel.getAllPrograms();
    if(!programs) {
      ApiUtils.reposeWithhSuccess(res, null, httpStatus.NOT_FOUND);
    } else {
      if(programs === 'error') ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
      else ApiUtils.reposeWithhSuccess(res, programs, httpStatus.OK);
    }
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

const getProgramsFull = async (req, res) => {
  try {
    const userId = req.swagger.params.userId.value;
    const { programsStartDate, programsEndDate } = req.body;
    const programs = await ProgramModel.getAllProgramsFullByUser(userId, programsStartDate, programsEndDate);

    if(programs === 'error') ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
    else if(!programs) ApiUtils.reposeWithhSuccess(res, null, httpStatus.NOT_FOUND);
    else ApiUtils.reposeWithhSuccess(res, programs, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

const getProgramsByRegionId = async (req, res) => {
  try {
    var regionId = req.swagger.params.regionId.value;
    const programs = await ProgramModel.getProgramsByRegionId(regionId);

    if(programs === 'error') ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
    else if(!programs) ApiUtils.reposeWithhSuccess(res, null, httpStatus.NOT_FOUND);
    else ApiUtils.reposeWithhSuccess(res, programs, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

const getProgramById = async (req, res) => {
  try {
    var id = req.swagger.params.id.value;
    if(id) var program = await ProgramModel.getProgramById(id);
    else ApiUtils.responseWithError(res, httpStatus.UNPROCESSABLE_ENTITY);

    if(program === 'error') ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
    else if(!program) ApiUtils.reposeWithhSuccess(res, null, httpStatus.NOT_FOUND);
    else ApiUtils.reposeWithhSuccess(res, program, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
};

const addNewProgram = async (req, res) => {
  try {
    const program = await ProgramModel.addNewProgram(req.body);


    if(program === 'Error') {
      ApiUtils.reposeWithhSuccess(res, httpStatus.INTERNAL_SERVER_ERROR);
    } else if(program === 'ValidationError') {
      ApiUtils.reposeWithhSuccess(res, 'There is a body validation error', httpStatus.UNPROCESSABLE_ENTITY);
    } else if(!program) {
      ApiUtils.reposeWithhSuccess(res, httpStatus.NOT_FOUND);
    } else {
      const programToCheck = await ProgramModel.getProgramById(program.programId);
      await ProgramModel.logChanges(program.programId, req.body.userId, {}, programToCheck, 'create');
      ApiUtils.reposeWithhSuccess(res, program, httpStatus.OK);
    }
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const deleteProgram = async (req, res) => {
  try {
    const programId = req.swagger.params.id.value;
    const userId = req.body.userId;
    const programToCheck = await ProgramModel.getProgramById(programId);
    const request = await ProgramModel.deleteProgram(programId);

    if(request === 'error') {
      ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
    } else if(!request) {
      ApiUtils.reposeWithhSuccess(res, null, httpStatus.NOT_FOUND);
    } else {
      await ProgramModel.logChanges(programId, userId, programToCheck, {}, 'delete');
      ApiUtils.reposeWithhSuccess(res, request, httpStatus.OK);
    }
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

const updateProgram = async (req, res) => {
  try {
    const programId = req.swagger.params.id.value;
    const body = req.body;
    const programToCheck = await ProgramModel.getProgramById(programId);

    if(!programToCheck) {
      ApiUtils.reposeWithhSuccess(res, null, httpStatus.NOT_FOUND);
    } else {
      const program = await ProgramModel.updateProgram(programId, body);

      await ProgramModel.logChanges(programId, req.body.userId, programToCheck, program, 'update');

      if(program === 'error') {
        ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
      } else {
        ApiUtils.reposeWithhSuccess(res, program, httpStatus.OK);
      }
    }
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err);
  }
}

export {
  getPrograms,
  getProgramsFull,
  getProgramsByRegionId,
  getProgramById,
  addNewProgram,
  deleteProgram,
  updateProgram
};
