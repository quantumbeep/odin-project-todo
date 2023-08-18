import { format, parseISO } from 'date-fns';
import { indexOf, update } from 'lodash';
import { clearList, createList } from './dom.js';

const clearInputs = () => {
  document.querySelector('#project').value = '';
  document.querySelector('#date').value = '';
};

const receiveItemData = (e) => {
  const projectText = document.querySelector('#project').value;
  const dueDate = document.querySelector('#date').value;
  console.log('received project item data from inputs');

  const dateCreated = Date.now();
  console.log(typeof document.querySelector('#date').value);
  console.log(Date.parse(document.querySelector('#date').value));

  const receiveTarget = e.target.parentElement.querySelector(
    'input:first-of-type'
  );

  if ((projectText, dueDate && receiveTarget.id === 'project')) {
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
  //check which add button was clicked
  //then add data to project list
  //or add data to task list
  console.log('adding to list...');

  const addBtn = e.target;
  if (addBtn.id === 'TASK-btn') {
    const id = addBtn.closest('li').id;
    const foundItem = list.find((item) => item.dateCreated.toString() === id);
    const targetIndex = list.indexOf(foundItem);
    const { targetTaskList } = list[targetIndex];
    targetTaskList.push(item);
  } else if (addBtn.id === 'ADD-btn') {
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

const delLastAdded = () => {
  const list = getFromLocalStorage();
  list.splice(list.length - 1, 1);
  localStorage.setItem('list', JSON.stringify(list));
  console.log('reset clicked');
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
  const parsedData = JSON.parse(data);
  console.log({ parsedData }, typeof parsedData);
  return parsedData;
};

const handleAdd = (e) => {
  console.log('handling add...');
  //receive the data into obj
  const itemData = receiveItemData(e);
  //retrieve list from local storage
  const list = getFromLocalStorage();

  if (isDataOKtoProcess(itemData, list)) {
    addItemToList(e, itemData, list);
    saveToLocalStorage(list);
  } else {
    return;
  }
};

const isDataOKtoProcess = (...data) => {
  console.log('Processing data:', {...data});
  if (data.includes(null) || data.includes(undefined)) {
    console.error('Data is NOT OK to process');
    return false;
  } else {
    console.log('Data is OK to process!');
    return true;
  }
};

const handleDel = (e) => {
  //retrieve list from local storage
  const list = getFromLocalStorage();

  //delete obj from array
  const listAfterDel = delItemFromList(e, list);

  //store array in local storage (stringify it first)
  saveToLocalStorage(listAfterDel);
};

const handleEdit = (e) => {
  //get item data from edit fields
  const newData = getNewData();

  //retrieve list from local storage
  const list = getFromLocalStorage();

  //update obj property in array
  const listAfterEdit = editItem(e, newData, list);

  //store array in local storage (stringify it first)
  saveToLocalStorage(listAfterEdit);

  //notify edit has been saved successfully
  alert('Item edited successfully');
};

const isSame = (e) => {
  const oldContent = e.target.closest('li').querySelector('p.name').textContent;
  console.log({ oldContent });
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
  getFromLocalStorage,
  handleAdd,
  handleDel,
  handleEdit,
  isSame,
  clearInputs,
  delLastAdded,
  isDataOKtoProcess,
};
