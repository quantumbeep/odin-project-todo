import { add } from 'lodash';
import Icon from './ice.jpg';
import { checkChange, getFromLocalStorage } from './logic.mjs';

const header = () => {
  const header = document.createElement('header');
  const mainForm = document.createElement('form');
  const text = createInput('text', 'todo');
  const date = createInput('date', 'date');
  const addItemBtn = ButtonFactory('ADD');
  const resetBtn = ButtonFactory('RESET');
  header.classList.add('header');
  mainForm.classList.add('main-form');

  // const myIcon = new Image();
  // myIcon.src = Icon;
  // header.append(myIcon);

  header.append(mainForm);
  mainForm.append(addItemBtn);
  mainForm.append(resetBtn);
  mainForm.append(text.input);
  mainForm.append(text.label);
  mainForm.append(date.input);
  mainForm.append(date.label);
  return header;
};

const ButtonFactory = (name) => {
  const buttonEl = document.createElement('button');
  buttonEl.textContent = name;
  buttonEl.classList.add(name);
  buttonEl.setAttribute('id', `${name}-btn`);
  return buttonEl;
};

const createLi = (item, list) => {
  const li = document.createElement('li');
  const btnContainer = document.createElement('div');
  const dataContainer = document.createElement('div');
  const id = document.createElement('p');
  const toDo = document.createElement('p');
  const dueDate = document.createElement('p');
  const delBtn = ButtonFactory('DEL');
  const editBtn = ButtonFactory('EDIT');

  // li.classList.add(`li-${i}`, 'li');
  li.classList.add('li');
  btnContainer.classList.add('li-btn-container')
  dataContainer.classList.add('li-data-container')

  // li.setAttribute('id', list[i].dateCreated);
  li.setAttribute('id', item.dateCreated);
  id.classList.add('item-id');
  toDo.classList.add('item-text');
  dueDate.classList.add('item-due');
  id.textContent = `ID: ${item.dateCreated}`;
  toDo.textContent = `PROJECT: ${item.toDoText}`;
  dueDate.textContent = `Due Date: ${item.dueDate}`;

  li.append(dataContainer);
  li.append(btnContainer);
  dataContainer.append(toDo);
  dataContainer.append(dueDate);
  dataContainer.append(id);
  btnContainer.append(delBtn);
  btnContainer.append(editBtn);

  console.log('li created');
  return li;
};

const createInput = (type, name) => {
  const input = document.createElement('input');
  input.setAttribute('type', type);
  input.setAttribute('value', name);
  input.setAttribute('name', name);
  input.setAttribute('id', `input-${name}`);
  input.setAttribute('placeholder', `Enter the ${name} here...`);
  input.classList.add(`input-${type}`, `input-${name}`);

  const label = document.createElement('label');
  label.setAttribute('for', input.name);
  label.textContent = `${input.name}`;
  return { input, label };
};

const createList = () => {
  const ul = document.createElement('ul');
  document.body.append(ul);

  //retrieve data list and render it
  const list = getFromLocalStorage();
  const copyList = list.slice()
  console.log(copyList);
  copyList.reverse().forEach(function(item) {
    const li = createLi(item, copyList);
    console.log(copyList.indexOf(item));
    ul.append(li)
  });
};

const reset = () => {
  clearLocalStorage();
  clearList();
  createList();
};

const clearList = () => {
  const ul = document.querySelector('ul');
  ul.remove();
};

const clearLocalStorage = () => {
  localStorage.clear();
  console.log('local cleared');
};

const showEditField = (e) => {
  //dom create input field - text, due date
  // if(e.target && e.target.id == 'EDIT-btn'){

  //disable all other edit and del buttons when editing an item
  const allEditBtns = document.querySelectorAll('.EDIT');
  const allDelBtns = document.querySelectorAll('.DEL');
  allEditBtns.forEach((element) => element.setAttribute('disabled', ''));
  allDelBtns.forEach((element) => element.setAttribute('disabled', ''));

  //create and show the edit input fields
  const editField = createInput('text', 'edit');
  const dateField = createInput('date', 'newDue');
  const saveBtn = ButtonFactory('SAVE');
  const cancelBtn = ButtonFactory('CANCEL');
  e.target.parentElement.append(editField.input);
  e.target.parentElement.append(dateField.input);
  e.target.parentElement.append(saveBtn);
  e.target.parentElement.append(cancelBtn);
};

const removeEditField = () => {
  clearList();
  createList();
};

const autoToggleSave = (e) => {
  const target = e.target;
  console.log(target.id);
  if (target && target.id === 'input-edit' && checkChange(e)) {
    //disable save button
    document.querySelector('#SAVE-btn').setAttribute('disabled', '');
  } else {
    //enable save button
    document.querySelector('#SAVE-btn').removeAttribute('disabled');
  }
};


const viewProject = () => {

}

export {
  header,
  createInput,
  createLi,
  createList,
  clearList,
  clearLocalStorage,
  autoToggleSave,
  showEditField,
  removeEditField,
  reset,
};
