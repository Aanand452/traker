import data from '../data';
import {
  OPEN_DELETE_MODAL,
  CLOSE_DELETE_MODAL,
  DELETE_ITEMS,
  DELETE_ITEM,
  SELECT_ITEMS,
  RESET_ITEMS,
  SET_ITEM,
  EDIT_ITEM,
  SET_PAGES,
  SET_CURRENT_PAGE,
  SORT_ITEMS
} from '../types/DataTable';

const INITIAL_STATE = {
  items: [...data],
  item: null,
  selection: [],
  isDeletePromptOpen: false,
  currentPage: 1,
  limit: 10,
  pages: [],
};

const dataTable = (state = INITIAL_STATE, action) => {
  let { type, items, item, selection, currentPage, pages, sortColumn, sortColumnDirection } = action;
  switch(type) {
    case OPEN_DELETE_MODAL:
      return {
        ...state,
        isDeletePromptOpen: true,
        item
      }
    case CLOSE_DELETE_MODAL:
      return {
        ...state,
        isDeletePromptOpen: false,
        item: null,
        selection: []
      }
    case SELECT_ITEMS:
      return {
        ...state,
        selection
      }
    case DELETE_ITEM:
      return {
        ...state,
        items,
        item: null,
        isDeletePromptOpen: false
      }
    case DELETE_ITEMS:
      return {
        ...state,
        selection: [],
        items,
        item: null,
        isDeletePromptOpen: false
      }
    case RESET_ITEMS:
      return {
        ...state,
        items: [...data]
      }
    case SET_ITEM:
      return {
        ...state,
        item
      }
    case EDIT_ITEM:
      return {
        ...state,
        items
      }
    case SET_PAGES:
      return {
        ...state,
        pages
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage
      }
    case SORT_ITEMS:
      return {
        ...state,
        items
      }
    default:
      return state;
  }
}

export default dataTable;