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
    const programs = await ProgramModel.getAllProgramsFull();
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

export { getPrograms, getProgramsFull }