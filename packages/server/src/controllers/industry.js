import ApiUtils from '@sara/common/src/api/ApiUtils';
import httpStatus from 'http-status-codes';
import Industry from '@sara/db/src/models/industry'


const getAllIndustries = async (req, res) => {  
  try {
    const industries = await Industry.getAll();

    ApiUtils.reposeWithhSuccess(res, industries, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

export { getAllIndustries }
