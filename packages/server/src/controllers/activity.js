import ApiUtils from '@sara/common/src/api/ApiUtils';
import httpStatus from 'http-status-codes';
import ActivityModel from '@sara/db/src/models/activity';


const addNewActivity = async (req, res) => {  
  try {
    const activities = req.body && await ActivityModel.addNewActivity(req.body)
    ApiUtils.reposeWithhSuccess(res, activities, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

const updateActivity = async (req, res) => {  
  try {
    const activities = req.body && await ActivityModel.addNewActivity(req.body)
    ApiUtils.reposeWithhSuccess(res, activities, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}


export { addNewActivity, updateActivity}