import ApiUtils from '@sara/common/src/api/ApiUtils';
import httpStatus from 'http-status-codes';
import ActivityModel from '@sara/db/src/models/activity';


const addNewActivity = async (req, res) => {  
  try {
    const activity = await ActivityModel.addNewActivity(req.body);
    if(activity === 'error') ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
    else ApiUtils.reposeWithhSuccess(res, activity, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

const updateActivity = async (req, res) => {  
  try {
    var activityId = req.swagger.params.id.value;
    var body = req.body
    
    const activityToCheck = await ActivityModel.getActivityById(activityId)
    if(!activityToCheck) {
      ApiUtils.reposeWithhSuccess(res, null, httpStatus.NOT_FOUND);
    } else {
      const activity = await ActivityModel.updateActivity(activityId, body);
      
      if(activity === 'error') ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
      else ApiUtils.reposeWithhSuccess(res, activity, httpStatus.OK);
    }    
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err);
  }
}

const getActivityById = async (req, res) => {  
  try {
    var activityId = req.swagger.params.id.value;
    const activity = await ActivityModel.getActivityById(activityId)

    if(activity === 'error') ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
    else if(!activity) ApiUtils.reposeWithhSuccess(res, null, httpStatus.NOT_FOUND);
    else ApiUtils.reposeWithhSuccess(res, activity, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err);
  }
}


export { addNewActivity, updateActivity, getActivityById }