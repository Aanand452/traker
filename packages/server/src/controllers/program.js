import ApiUtils from '@sara/common/src/api/ApiUtils';
import httpStatus from 'http-status-codes';
import ProgramModel from '@sara/db/src/models/program';


const getPrograms = async (req, res) => {  
  try {
    const programs = await ProgramModel.getAllPrograms();
    ApiUtils.reposeWithhSuccess(res, programs, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

export { getPrograms }