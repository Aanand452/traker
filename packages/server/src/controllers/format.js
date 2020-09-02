import ApiUtils from '@sara/common/src/api/ApiUtils';
import httpStatus from 'http-status-codes';
import FormatModel from '@sara/db/src/models/format';

const getFormats = async (req, res) => {
  try {
    const formats = await FormatModel.getAllFormats();
    ApiUtils.reposeWithhSuccess(res, formats, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

const getFilteredFormats = async (req, res) => {
  try {
    const formats = await FormatModel.getFilteredFormats(req.swagger.params.tacticId.value);
    ApiUtils.reposeWithhSuccess(res, formats, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

export { getFormats, getFilteredFormats }