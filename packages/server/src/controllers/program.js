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
    var userId = req.swagger.params.userId.value;
    const programs = await ProgramModel.getAllProgramsFullByUser(userId);

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
    const fields = [
      "name",
      "budget",
      "metrics",
      "parentCampaignId",
      "customerMessage",
      "businessGoals",
      "regionId",
      "lifecycleStageId",
      "apm1Id",
      "apm2Id",
      "industryId",
      "segmentId",
      "personaId",
      "userId"
    ];

    const error = fields.some(field => !req.body[field]);
    if (error) throw new Error ('422');

    const program = await ProgramModel.addNewProgram(req.body);

    if(program === 'Error') ApiUtils.reposeWithhSuccess(res, null, httpStatus.INTERNAL_SERVER_ERROR);
    else if(!program) ApiUtils.reposeWithhSuccess(res, null, httpStatus.NOT_FOUND);
    else ApiUtils.reposeWithhSuccess(res, program, httpStatus.OK);
  } catch (err) {
    if(err.toString() === 'Error: 422') ApiUtils.responseWithError(res, httpStatus.UNPROCESSABLE_ENTITY, 'Some parameter is missing in body');
    else ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const deleteProgram = async (req, res) => {
  try {
    const programId = req.body.programId;
    const request = await ProgramModel.deleteProgram(programId);

    if(request === 'error') ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
    else if(!request) ApiUtils.reposeWithhSuccess(res, null, httpStatus.NOT_FOUND);
    else ApiUtils.reposeWithhSuccess(res, request, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

export { getPrograms, getProgramsFull, getProgramById, addNewProgram, deleteProgram }