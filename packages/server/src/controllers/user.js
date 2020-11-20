import ApiUtils from '@sara/common/src/api/ApiUtils';
import httpStatus from 'http-status-codes';
import UserModel from '@sara/db/src/models/user';
import { signIn } from '../auth';



const doLogin = async (req, res) => {  
  try {
    const loginInfo = req.body.username &&
      await UserModel.getAutenticatedUser(req.body.username, req.body.password);

    if(loginInfo.length){
      var token = signIn(loginInfo[0]);
    }

    const login = {
      userId: loginInfo[0].userId,
      username: loginInfo[0].username,
      name: loginInfo[0].name,
      password: loginInfo[0].password,
      role: loginInfo[0].role,
      token
    };

    ApiUtils.reposeWithhSuccess(res, login, httpStatus.OK);
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