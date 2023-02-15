import { format, parseISO } from 'date-fns';
import { indexOf, update } from 'lodash';
import { clearList, createList } from './dom.js';

const clearInputs = () => {
  document.querySelector('.input-project').value = '';
  document.querySelector('.input-date').value = '';
  console.log('input fields cleared');
};

const receiveItemData = (e) => {
  const projectText = document.querySelector('.input-project').value;
  console.log(document.querySelector('#input-date').value);
  const dueDate = document.querySelector('#input-date').value;
  console.log('received project item data from inputs');

  const dateCreated = Date.now();
  console.log(typeof document.querySelector('#input-date').value);
  console.log(Date.parse(document.querySelector('#input-date').value));

  console.log(e.target.parentElement);
  console.log(e.target.parentElement.querySelector('input:first-of-type').id);
  const receiveTarget = e.target.parentElement.querySelector(
    'input:first-of-type'
  ).id;
  console.log(e.target.classList);

  if (projectText && dueDate && receiveTarget === 'input-project') {
    const taskList = [];
    return {
      projectText,
      dueDate,
      dateCreated,
      taskList,
    };
  } else if (receiveTarget === 'input-task') {
    const taskText = document.querySelector('.input-task').value;
    return {
      taskText,
      dateCreated,
    };
  } else {
    alert('Seems like there was something missing...');
  }
};

const addItemToList = (e, item, list) => {
  //if event origination (aka which ADD button was clicked)
  //is ADD btn within ul>li then push the item to tasklist
  const targetAddBtn = e.target;
  if (targetAddBtn.classList.contains('add-task-btn')) {
    const addTarget = e.target.closest('li').id;

    const foundItem = list.find(
      (item) => item.dateCreated.toString() === addTarget
    );
    const targetIndex = list.indexOf(foundItem);
    const targetTaskList = list[targetIndex].taskList;
    targetTaskList.push(item);
  } else if (e.target.id === 'ADD-btn') {
    //else push to project list
    list.push(item);
    console.log('added to array');
  }
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
  //change the value of 'projectText' property in projectItem
  const editTarget = e.target.closest('li').id;
  const foundItem = list.find(
    (item) => item.dateCreated.toString() === editTarget
  );
  console.log(list.indexOf(foundItem));
  console.log(foundItem);
  const targetIndex = list.indexOf(foundItem);
  const { projectText, dueDate } = newData;
  const updatedItem = { ...foundItem, projectText, dueDate };
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

const handleAdd = (e) => {
  e.preventDefault();

  //receive the data into obj
  const itemData = receiveItemData(e);
  console.log({ itemData });

  //retrieve list from local storage
  const list = getFromLocalStorage();
  console.log({ list });

  if (itemData == null || list == null) {
    return;
  } else {
    //push obj to array 'list'
    addItemToList(e, itemData, list);

    //'list' is now modified and ready to store
    //store array in local storage (stringify it first)
    saveToLocalStorage(list);

    //clear the list before re-rendering
    clearList();
    console.log('list cleared');
    //re-render list
    createList(list, 0);
  }
};

const handleDel = (e) => {
  //retrieve list from local storage
  const list = getFromLocalStorage();

  //delete obj from array
  const listAfterDel = delItemFromList(e, list);

  //store array in local storage (stringify it first)
  saveToLocalStorage(listAfterDel);

  //clear the rendered list before re-rendering
  clearList();

  //re-render list
  createList(listAfterDel, 0);
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

  //re-render list
  createList(listAfterEdit, 0);

  //notify edit has been saved successfully
  alert('Item edited successfully');
};

const isSame = (e) => {
  const oldContent = e.target
    .closest('li')
    .querySelector('.item-project').textContent;
  console.log(oldContent);
  const editFieldContent = e.target.value;
  console.log('check change');
  console.log(editFieldContent);
  if (oldContent !== editFieldContent) {
    return false;
  } else {
    return true;
  }
};

const getNewData = () => {
  const edit = document.querySelector('.input-edit');
  const due = document.querySelector('.input-newDue');
  return {
    projectText: edit.value,
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
  isSame,
  clearInputs,
};
