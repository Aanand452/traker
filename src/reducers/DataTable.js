import data from '../data';

const INITIAL_STATE = {
  items: [...data],
  item: undefined,
  selection: [],
  isDeletePromptOpen: false
};

const dataTable = (state = INITIAL_STATE, action) => {
  let { type } = action;
  switch(type) {
    case 'OPEN_DELETE_MODAL':
      return {
        ...state,
        isDeletePromptOpen: true,
        item: action.item
      }
    case 'CLOSE_DELETE_MODAL':
      return {
        ...state,
        isDeletePromptOpen: false,
        item: undefined,
        selection: []
      }
    case 'SELECT_ITEMS':
      return {
        ...state,
        selection: action.selection
      }
    case 'DELETE_ITEM':
      return {
        ...state,
        items: action.items,
        item: undefined,
        isDeletePromptOpen: false
      }
    case 'DELETE_ITEMS':
      return {
        ...state,
        selection: [],
        items: action.items,
        item: undefined,
        isDeletePromptOpen: false
      }
    default:
      return state;
  }
}

export default dataTable;