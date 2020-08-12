export const openDeletePrompt = item => ({
  type: 'OPEN_DELETE_MODAL',
  item
});

export const closeDeletePrompt = () => ({
  type: 'CLOSE_DELETE_MODAL'
});

export const handleDeleteSelection = (items, item, selection) => {
  if(selection.length > 0) {
    let filteredItems = items.filter(el => !selection.includes(el));
    return {
      type: 'DELETE_ITEMS',
      items: filteredItems
    }
  } else {
    let filteredItems = items.filter(el => el.id !== item.id);
    return {
      type: 'DELETE_ITEM',
      items: filteredItems
    }
  }
}

export const selectItem = (event, data) => {
  let { selection } = data;
  return {
      type: 'SELECT_ITEMS',
      selection
  }
}