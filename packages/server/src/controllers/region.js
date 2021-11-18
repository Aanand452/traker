import ApiUtils from '@sara/common/src/api/ApiUtils';
import httpStatus from 'http-status-codes';
import RegionModel from '@sara/db/src/models/region'


const getRegion = async (req, res) => {  
  try {
    const regions = await RegionModel.getAllRegions();
    ApiUtils.reposeWithhSuccess(res, regions, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

const addNewRegion = async (req, res) => {  
  try {
    const region = await RegionModel.addNew(req.body);
    
    if(region === 'error') ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
    else ApiUtils.reposeWithhSuccess(res, region, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

export { getRegion, addNewRegion }