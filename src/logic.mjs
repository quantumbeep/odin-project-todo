import { indexOf, update } from 'lodash';
import { clearList, createList } from './dom.js';

const clearInputs = () => {
  document.querySelector('.input-todo').value = '';
  document.querySelector('.input-date').value = '';
  console.log('value set');
};

const receiveItemData = () => {
  const toDoText = document.querySelector('.input-text').value;
  const dueDate = document.querySelector('.input-date').value;
  console.log('received item data from inputs');
  const dateCreated = Date.now();

  if (!toDoText || !dueDate) {
    alert('Please complete the missing fields...');
  }
  return {
    toDoText,
    dueDate,
    dateCreated,
  };
};

const addItemToList = (item, list) => {
  list.push(item);
  console.log('added to array');
};

const delItemFromList = (e, list) => {
  const delTarget = e.target.closest('li').id;
  console.log({ delTarget });
  console.log(typeof delTarget);
  const filteredList = list.filter(
    (item) => item.dateCreated.toString() !== delTarget
  );
  console.log({ filteredList });
  return filteredList;
};

const editItem = (e, newData, list) => {
  //change the value of 'toDoText' property in toDoItem
  const editTarget = e.target.closest('li').id;
  const foundItem = list.find(
    (item) => item.dateCreated.toString() === editTarget
  );
  console.log(list.indexOf(foundItem));
  console.log(foundItem);
  const targetIndex = list.indexOf(foundItem);
  const { toDoText, dueDate } = newData;
  const updatedItem = { ...foundItem, toDoText, dueDate };
  console.log(updatedItem);
  list.splice(targetIndex, 1, updatedItem);
  return list;
};

const saveToLocalStorage = (modifiedList) => {
  localStorage.setItem('list', JSON.stringify(modifiedList));
  console.log('saved to local');
};

const getFromLocalStorage = () => {
  const data = localStorage.getItem('list') || '[]';
  console.log('retrieved list from local');
  const cleanData = JSON.parse(data);
  return cleanData;
};

const handleAdd = () => {
  //receive the data into obj
  const itemData = receiveItemData();

  //retrieve list from local storage
  const list = getFromLocalStorage();
  console.log({ list });

  //push obj to array 'list' - 'list' is now modified and ready to store
  addItemToList(itemData, list);

  //store array in local storage (stringify it first)
  saveToLocalStorage(list);

  //clear the list before re-rendering
  clearList();

  //re-render list
  createList();
};

const handleDel = (e) => {
  //retrieve list from local storage
  const list = getFromLocalStorage();

  //delete obj from array
  const listAfterDel = delItemFromList(e, list);

  //store array in local storage (stringify it first)
  saveToLocalStorage(listAfterDel);

  //clear the list before re-rendering
  clearList();

  //re-render list
  createList();
};

const handleEdit = (e) => {
  //get item data from edit fields
  const newData = getNewData();
  console.log(newData);
  //retrieve list from local storage
  const list = getFromLocalStorage();

  //update obj property in array
  const listAfterEdit = editItem(e, newData, list);
  console.log(listAfterEdit);

  //store array in local storage (stringify it first)
  saveToLocalStorage(listAfterEdit);

  //clear the list before re-rendering
  clearList();

  //re-render listsrc
  createList();

  //notify edit has been saved successfully
  alert('Item edited successfully');
};

const checkChange = (e) => {
  const itemContent =
    e.target.parentElement.querySelector('.item-text').textContent;
  const targetContent = e.target.value;
  return itemContent === targetContent || false;
};

const getNewData = () => {
  const edit = document.querySelector('.input-edit');
  const due = document.querySelector('.input-newDue');
  return {
    toDoText: edit.value,
    dueDate: due.value,
  };
};

export {
  receiveItemData,
  addItemToList,
  getFromLocalStorage,
  handleAdd,
  handleDel,
  handleEdit,
  checkChange,
  clearInputs,
};
