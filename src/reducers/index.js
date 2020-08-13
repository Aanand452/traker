import { combineReducers } from 'redux';
import CurrencyFormatter from 'currency-formatter';
import { DEFAULT_LIST } from '../config/config';
import update from 'immutability-helper';

import dataTable from './DataTable';

export default combineReducers({
  dataTable
});
