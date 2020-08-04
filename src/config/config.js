/*global API_BASE_URL*/
/*global DEFAULT_PRICELIST*/
const BASE_URL = API_BASE_URL;
const DEFAULT_LIST = DEFAULT_PRICELIST;
const PRODUCT_ALL_URL = BASE_URL + '/pricelist/current/';
const UPLOAD_FILE_URL = BASE_URL + '/upload';
const EXPORT_EXCEL_URL = BASE_URL + '/pricelist/export/xlsx';
const SCRATCHPAD_EXPORT_URL = BASE_URL + '/scratchpad/export';
const SCRATCHPAD_QUERY_URL = BASE_URL + '/scratchpad/query';
const LOGIN_URL = '/login';
const CURRENCY_FORMAT = {
  precision: 2,
  decimal: '.',
  thousand: ','
};

export {
  LOGIN_URL,
  PRODUCT_ALL_URL,
  UPLOAD_FILE_URL,
  EXPORT_EXCEL_URL,
  SCRATCHPAD_EXPORT_URL,
  SCRATCHPAD_QUERY_URL,
  DEFAULT_LIST,
  CURRENCY_FORMAT
};
