import ApiUtils from '@sara/common/src/api/ApiUtils';
import httpStatus from 'http-status-codes';
import FormatModel from '@sara/db/src/models/format';

const getAllFormats = async (req, res) => {
  try {
    const formats = await FormatModel.getAllFormats();
    if(!formats) {
      ApiUtils.reposeWithhSuccess(res, null, httpStatus.NOT_FOUND);
    } else {      
      if(formats === 'error') ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
      else ApiUtils.reposeWithhSuccess(res, formats, httpStatus.OK);
    }
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

const getFormatsByTacticId = async (req, res) => {
  try {
    const formats = await FormatModel.getFormatsByTacticId(req.swagger.params.tacticId.value);
    if(!formats) {
      ApiUtils.reposeWithhSuccess(res, null, httpStatus.NOT_FOUND);
    } else {      
      if(formats === 'error') ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
      else ApiUtils.reposeWithhSuccess(res, formats, httpStatus.OK);
    }
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

const addNewFormat = async (req, res) => {  
  try {
    const format = await FormatModel.addNew(req.body);
    
    if(format === 'error') ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
    else ApiUtils.reposeWithhSuccess(res, format, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

export { getAllFormats, getFormatsByTacticId, addNewFormat }