import {
  OPEN_DELETE_MODAL,
  CLOSE_DELETE_MODAL,
  DELETE_ITEMS,
  DELETE_ITEM,
  SELECT_ITEMS,
  RESET_ITEMS,
  SET_ITEM,
  EDIT_ITEM
} from '../types/DataTable';

export const openDeletePrompt = item => ({
  type: OPEN_DELETE_MODAL,
  item
});

export const closeDeletePrompt = () => ({
  type: CLOSE_DELETE_MODAL
});

export const resetItems = () => ({
  type: RESET_ITEMS
});

export const handleDeleteSelection = (items, item, selection) => {
  if(selection.length > 0) {
    let filteredItems = items.filter(el => !selection.includes(el));
    return {
      type: DELETE_ITEMS,
      items: filteredItems
    }
  } else {
    let filteredItems = items.filter(el => el.id !== item.id);
    return {
      type: DELETE_ITEM,
      items: filteredItems
    }
  }
}

export const selectItem = (event, data) => {
  let { selection } = data;
  return {
      type: SELECT_ITEMS,
      selection
  }
}

export const setItem = item => {
  return {
    type: SET_ITEM,
    item
  }
}

export const editItem = (items, item) => {
  let itemsEdited = [...items];
  itemsEdited.splice(item.id, 1, item);
  return {
    type: EDIT_ITEM,
    items: itemsEdited
  }
}