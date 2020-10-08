import ApiUtils from '@sara/common/src/api/ApiUtils';
import httpStatus from 'http-status-codes';
import Segment from '@sara/db/src/models/segment'


const getAllSegments = async (req, res) => {  
  try {
    const segments = await Segment.getAll();

    ApiUtils.reposeWithhSuccess(res, segments, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

const addNewSegment = async (req, res) => {  
  try {
    const segment = await Segment.addNew(req.body);
    
    if(segment === 'error') ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR);
    else ApiUtils.reposeWithhSuccess(res, segment, httpStatus.OK);
  } catch (err) {
    ApiUtils.responseWithError(res, httpStatus.INTERNAL_SERVER_ERROR, err.toString());
  }
}

export { getAllSegments, addNewSegment }
