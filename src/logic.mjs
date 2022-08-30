import { format, parseISO } from 'date-fns';
import { indexOf, update } from 'lodash';
import { clearList, createList } from './dom.js';

const clearInputs = () => {
  document.querySelector('.input-project').value = '';
  document.querySelector('.input-date').value = '';
  console.log('value set');
};

const receiveItemData = (e) => {
  const projectText = document.querySelector('.input-project').value;
  console.log(typeof document.querySelector('.input-date').value);
  console.log(document.querySelector('.input-date').value);
  console.log(Date.parse(document.querySelector('.input-date').value));
  const dueDate = document.querySelector('.input-date').value;
  // const dueDate = format(parseISO(document.querySelector('.input-date').value), 'EEEE, MMM do, yyyy');
  console.log('received project item data from inputs');
  const dateCreated = Date.now();
  const emptyTaskList = [];
  const taskList = {
    task: 'example task 1',
    taskID: Date.now(),
  };

  console.log(e.target.parentElement);
  console.log(e.target.parentElement.querySelector('input:first-of-type').id);
  const receiveTarget = e.target.parentElement.querySelector(
    'input:first-of-type'
  ).id;

  if (projectText && dueDate && receiveTarget === 'input-project') {
    return {
      projectText,
      dueDate,
      dateCreated,
      emptyTaskList,
    };
  } else if (receiveTarget === 'input-task') {
    return {
      taskList,
    };
  } else {
    alert('Please complete the missing fields...');
  }
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
  //receive the data into obj

  const itemData = receiveItemData(e);
  console.log(itemData);
  //retrieve list from local storage
  const list = getFromLocalStorage();
  console.log({ list });

  if (itemData == null || list == null) {
    return;
  } else {
    //push obj to array 'list' - 'list' is now modified and ready to store
    addItemToList(itemData, list);

    //store array in local storage (stringify it first)
    saveToLocalStorage(list);

    //clear the list before re-rendering
    clearList();

    //re-render list
    createList();
  }
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

  //re-render list
  createList();

  //notify edit has been saved successfully
  alert('Item edited successfully');
};

const checkChange = (e) => {
  console.log(e.target.closest('li').querySelector('.item-project'));
  const oldContent = e.target
    .closest('li')
    .querySelector('.item-project').textContent;
  const targetContent = e.target.value;
  return oldContent === targetContent || false;
};

const getNewData = () => {
  const edit = document.querySelector('.input-edit');
  const due = document.querySelector('.input-newDue');
  return {
    projectText: edit.value,
    dueDate: due.value
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
