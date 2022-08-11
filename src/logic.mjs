import { clearList, createBtn, createInput, createList } from './dom.js';

const receiveItemData = () => {
  const toDoText = document.querySelector('.input-text').value;
  const dueDate = document.querySelector('.input-date').value;
  console.log('received item data from inputs');
  const dateCreated = Date.now();

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

//editFn
const editItem = (e, list) => {
  //change the value of 'toDoText' property in toDoItem
  const editTarget = e.target.parentElement.id;
  const foundItem = list.find(
    (item) => item.dateCreated.toString() === editTarget
  );
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
  e.preventDefault();

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
const enableSave = () => {};

const saveEdit = () => {
  //
};

const checkChange = (e) => {
  const itemContent =
    e.target.parentElement.querySelector('.item-text').textContent;

  const fieldContent = editField.input.value;
  return itemContent === fieldContent;
};

const handleEdit = (e) => {
  e.preventDefault();

  //dom create input field - text, due date
  const editField = createInput('text', 'edit');
  const dateField = createInput('date', 'newDue');
  e.target.parentElement.append(editField.input);
  e.target.parentElement.append(dateField.input);
  const saveBtn = createBtn('SAVE', saveEdit);
  e.target.parentElement.append(saveBtn);
  document.querySelector('#SAVE-btn').setAttribute('disabled', '');
  editField.input.addEventListener('focus', (e) => {
    checkChange(e);
    document.querySelector('#SAVE-btn').removeAttribute('disabled');
  });

  //retrieve list from local storage
  const list = getFromLocalStorage();

  //update obj property in array
  const listAfterEdit = editItem(e, itemData, list);

  //store array in local storage (stringify it first)
  saveToLocalStorage(listAfterEdit);

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
  handleEdit,
};
