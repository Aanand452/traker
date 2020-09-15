import httpStatus from 'http-status-codes';
import { ERROR_PREFIX } from '../logs/MessagePrefix'; 

export default class ApiUtils {
  static reposeWithhSuccess(response, result = {}, code = httpStatus.OK) {
    const status = httpStatus.getStatusText(code);
    const payload = { 
      info: {
        status,
        code,
      },
      result
    };

    response.status(code).json(payload);
  }

  static responseWithError(response, code, errorMessage) {
    const status = httpStatus.getStatusText(code);
    const payload = {
      info: {
        code: code || 500,
        status,
      },
      message: errorMessage || `Error has happened in the server, will be fixed it soon`
    };

    errorMessage && console.error(ERROR_PREFIX, errorMessage);
    !errorMessage && console.error(ERROR_PREFIX, status);

    response.status(code).json(payload);
  }
}