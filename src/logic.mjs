// let toDoList = [];

import { clearList, createList } from './dom.js';

//editFn
const editToDo = () => {
  //change the value of 'toDoText' property in toDoItem
};

const receiveItemData = () => {
  const toDoInput = document.querySelector('.input-text').value;
  console.log('received item data from inputs');
  return {
    toDoText: toDoInput,
    dueDate: 'Sample dueDate',
    dateCreated: Date.now(),
  };
};

const addItemToList = (item, list) => {
  list.push(item);
  console.log('added to array');
};

const delItemFromList = (e, list) => {
  const delTarget = e.target.parentElement.id;
  console.log(delTarget);
  console.log(typeof delTarget);
  // list.splice(delTarget, 1);
  const filteredList = list.filter(
    (item) => item.dateCreated.toString() !== delTarget
  );
  console.log({ filteredList });
  return filteredList;
};

const saveToLocalStorage = (modifiedList) => {
  localStorage.setItem('list', JSON.stringify(modifiedList));
  console.log('saved to local');
};

const getFromLocalStorage = () => {
  const data = localStorage.getItem('list') || '[]';
  console.log('retrieved list from local');
  return JSON.parse(data);
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

export {
  receiveItemData,
  addItemToList,
  getFromLocalStorage,
  handleAdd,
  handleDel,
};
