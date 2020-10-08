import ApiUtils from '@sara/common/src/api/ApiUtils';
import httpStatus from 'http-status-codes';
import UserModel from '@sara/db/src/models/user';



const doLogin = async (req, res) => {  
  try {
    const programs = req.body.password && req.body.username &&
      await UserModel.getAutenticatedUser(req.body.username, req.body.password);

    console.log(programs);

    ApiUtils.reposeWithhSuccess(res, programs, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

const addNewUser = async (req, res) => {  
  try {
    const user = await UserModel.addNew(req.body);
    
    if(user === 'error') ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
    else ApiUtils.reposeWithhSuccess(res, user, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

export { doLogin, addNewUser }