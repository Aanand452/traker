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
    const program = await ProgramModel.getProgramById(id);

    if(program === 'error') ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
    else if(!program) ApiUtils.reposeWithhSuccess(res, null, httpStatus.NOT_FOUND);
    else ApiUtils.reposeWithhSuccess(res, program, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString()); 
  }
};

export { getPrograms, getProgramsFull, getProgramById }