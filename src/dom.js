import { add } from 'lodash';
import Icon from './ice.jpg';
import { checkChange, getFromLocalStorage } from './logic.mjs';

const header = () => {
  const header = document.createElement('header');
  const mainForm = document.createElement('form');
  header.classList.add('header');
  mainForm.classList.add('main-form');
  header.append(mainForm);
  // Add the image to our existing div.
  const myIcon = new Image();
  myIcon.src = Icon;

  //--Use the button factory--
  // 1. Make a button object first
  const addItemBtn = ButtonFactory('ADD');
  const resetBtn = ButtonFactory('RESET');
  // 2. Call function on the btn object
  mainForm.append(addItemBtn);
  mainForm.append(resetBtn);
  // mainForm.append(btn.createBtn('RESET'));

  // 3. Select the button using automatically created class
  // 4. Add an event listener to it
  // document.querySelector('.ADD').addEventListener('click', handleAdd);
  // document.querySelector('.RESET').addEventListener('click', reset);

  const text = createInput('text', 'todo');
  const date = createInput('date', 'date');
  mainForm.append(text.input);
  mainForm.append(date.input);
  mainForm.append(text.label);
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

const createLi = (i) => {
  const li = document.createElement('li');
  const btnContainer = document.createElement('div');
  const dataContainer = document.createElement('div');
  const id = document.createElement('p');
  const toDo = document.createElement('p');
  const dueDate = document.createElement('p');
  const delBtn = ButtonFactory('DEL');
  const editBtn = ButtonFactory('EDIT');

  li.classList.add(`li-${i}`, 'li');
  li.classList.add('li');

  const list = getFromLocalStorage();

  li.setAttribute('id', list[i].dateCreated);
  id.classList.add('item-id');
  toDo.classList.add('item-text');
  dueDate.classList.add('item-due');
  id.textContent = `ID: ${list[i].dateCreated}`;
  toDo.textContent = `To Do: ${list[i].toDoText}`;
  dueDate.textContent = `Due Date: ${list[i].dueDate}`;

  li.append(btnContainer);
  li.append(dataContainer);
  dataContainer.append(toDo);
  dataContainer.append(dueDate);
  dataContainer.append(id);
  btnContainer.append(delBtn);
  btnContainer.append(editBtn);

  console.log('li created');
  return li;
};

const setInputVal = () => {};

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

  //retrieve data list and render it
  const list = getFromLocalStorage();
  list
    .slice()
    .reverse()
    .forEach((item, i) => {
      ul.append(createLi(i));
    });
  document.body.append(ul);
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
