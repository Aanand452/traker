import ApiUtils from '@sara/common/src/api/ApiUtils';
import httpStatus from 'http-status-codes';
import APM1 from '@sara/db/src/models/apm1'


const getAllAPM1 = async (req, res) => {  
  try {
    const apms = await APM1.getAll();

    ApiUtils.reposeWithhSuccess(res, apms, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

const addNewAPM1 = async (req, res) => {  
  try {
    const apm = await APM1.addNew(req.body);
    
    if(apm === 'error') ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
    else ApiUtils.reposeWithhSuccess(res, apm, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

export { getAllAPM1, addNewAPM1 }
