import ApiUtils from '@sara/common/src/api/ApiUtils';
import httpStatus from 'http-status-codes';
import emoji from 'node-emoji';

const getInfo = async (req, res) => {  
  try {
    ApiUtils.reposeWithhSuccess(res, {
      status: `ready for a ${emoji.emoji.beers}`
    }, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

export { getInfo }