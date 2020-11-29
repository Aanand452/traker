import ApiUtils from '@sara/common/src/api/ApiUtils';
import httpStatus from 'http-status-codes';
import ActivityModel from '@sara/db/src/models/activity';

const getActivities = async (req, res) => {  
  try {
    const userId = req.swagger.params.userId.value;
    const { date } = req.body

    const activities = await ActivityModel.getAllActivitiesByUser(userId, date);

    if(activities === 'error') ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
    else if(!activities) ApiUtils.reposeWithhSuccess(res, null, httpStatus.NOT_FOUND);
    else ApiUtils.reposeWithhSuccess(res, activities, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

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
    
    const activityToCheck = await ActivityModel.getActivityById(activityId)
    if(!activityToCheck) {
      ApiUtils.reposeWithhSuccess(res, null, httpStatus.NOT_FOUND);
    } else {
      if(activityToCheck.userId) {
        var body = {
          title: req.body.title,
          campaignId: req.body.campaignId,
          formatId: req.body.formatId,
          abstract: req.body.title,
          regionId: req.body.regionId,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          asset: req.body.asset,
          programId: req.body.programId,
          customerMarketing: req.body.customerMarketing,
        };
      } else {
        var body = req.body;
      }

      const activity = await ActivityModel.updateActivity(activityId, body);
      await ActivityModel.logChanges(activityId, req.body.userId, activityToCheck, activity);

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

const deleteActivity = async (req, res) => {
  try {
    const activityId = req.body.activityId;
    const request = await ActivityModel.deleteActivity(activityId);

    if(request === 'error') ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
    else if(!request) ApiUtils.reposeWithhSuccess(res, null, httpStatus.NOT_FOUND);
    else ApiUtils.reposeWithhSuccess(res, request, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

export { getActivities, addNewActivity, updateActivity, getActivityById, deleteActivity };
