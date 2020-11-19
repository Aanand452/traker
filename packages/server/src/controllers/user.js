import ApiUtils from '@sara/common/src/api/ApiUtils';
import httpStatus from 'http-status-codes';
import UserModel from '@sara/db/src/models/user';
import { signIn } from '../auth';



const doLogin = async (req, res) => {  
  try {
    let loginInfo = req.body.username &&
      await UserModel.getAutenticatedUser(req.body.username, req.body.password);

    console.log(loginInfo[0].userId);
    if(loginInfo.length){
      var token = signIn(loginInfo[0]);
    }
    
    ApiUtils.reposeWithhSuccess(res, loginInfo, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

/**
 * 
 * Not used metothd , To be deleted
 * 
 */

/*
const addNewUser = async (req, res) => {  
  try {
    const user = await UserModel.addNew(req.body);
    
    if(user === 'error') ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
    else ApiUtils.reposeWithhSuccess(res, user, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}*/

export { doLogin }