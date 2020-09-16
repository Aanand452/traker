import ApiUtils from '@sara/common/src/api/ApiUtils';
import httpStatus from 'http-status-codes';
import APM2 from '@sara/db/src/models/apm2'


const getAllAPM2 = async (req, res) => {  
  try {
    const apms = await APM2.getAll();

    ApiUtils.reposeWithhSuccess(res, apms, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

export { getAllAPM2 }
