import ApiUtils from '@sara/common/src/api/ApiUtils';
import httpStatus from 'http-status-codes';
import TacticModel from '@sara/db/src/models/tactic';

const getTactics = async (req, res) => {
  try {
    const tactics = await TacticModel.getAllTactics();
    ApiUtils.reposeWithhSuccess(res, tactics, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

export { getTactics }