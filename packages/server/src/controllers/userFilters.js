import ApiUtils from '@sara/common/src/api/ApiUtils';
import httpStatus from 'http-status-codes';
import UserFilterModel from '@sara/db/src/models/userFilters';


const addNewUserFilter = async (req, res) => {
    try {
      const userFilter = await UserFilterModel.addNewUserFilter(req.body);
      ApiUtils.reposeWithhSuccess(res, userFilter, httpStatus.OK);
    }catch (err) {
        console.log(err)
    }
  }

const getUserFilterByUserId = async (req, res) => { 
    var id = req.swagger.params.userId.value;
    if(id) var userFilters = await UserFilterModel.getUserFilterByUserId(id);
    ApiUtils.reposeWithhSuccess(res, userFilters, httpStatus.OK);
}
  

export {
  addNewUserFilter,
  getUserFilterByUserId,
}