import ApiUtils from '@sara/common/src/api/ApiUtils';
import httpStatus from 'http-status-codes';
import LifecycleStage from '@sara/db/src/models/lifecycleStage'


const getAllLifecycleStages = async (req, res) => {  
  try {
    const lifecycleStages = await LifecycleStage.getAll();
    
    ApiUtils.reposeWithhSuccess(res, lifecycleStages, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

export { getAllLifecycleStages }