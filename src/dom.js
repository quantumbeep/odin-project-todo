import { add } from 'lodash';
import Icon from './ice.jpg';
import {
  checkChange,
  getFromLocalStorage,
  handleAdd,
  handleDel,
  handleEdit,
} from './logic.mjs';
import printMe from './print.js';

const component = () => {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = ['Hello', 'there'].join(' ');
  element.classList.add('hello');
  // Add the image to our existing div.
  const myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
};

//DOM creation
const createBtn = (btnName, btnFn) => {
  const btn = document.createElement('button');
  btn.textContent = btnName;
  btn.classList.add(`${btnName}`);
  btn.setAttribute('id', `${btnName}-btn`);
  // btn.addEventListener('click', btnFn);
  return btn;
};

const createLi = (i) => {
  const li = document.createElement('li');
  if (i) {
    li.classList.add(`li-${i}`, 'li');
  } else {
    li.classList.add('li');
  }
  const btnContainer = document.createElement('div');
  const dataContainer = document.createElement('div');

  const list = getFromLocalStorage();
  const id = document.createElement('p');
  const toDo = document.createElement('p');
  const dueDate = document.createElement('p');
  li.setAttribute('id', list[i].dateCreated);
  id.classList.add('item-id');
  toDo.classList.add('item-text');
  dueDate.classList.add('item-due');
  id.textContent = `ID: ${list[i].dateCreated}`;
  toDo.textContent = `To Do: ${list[i].toDoText}`;
  dueDate.textContent = `Due Date: ${list[i].dueDate}`;
  li.append(toDo);
  li.append(dueDate);
  li.append(id);

  const delBtn = createBtn('DEL');
  li.append(delBtn);

  const editBtn = createBtn('EDIT');
  li.append(editBtn);
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
  ul.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target.id === 'EDIT-btn') {
      showEditField(e);
    } else if (e.target.id === 'SAVE-btn') {
      handleEdit(e);
    
    } else if (e.target.id === 'DEL-btn') {
      handleDel(e);
    
    } else if (e.target.id === 'CANCEL-btn') {
      removeEditField(e);
    }
  });
  const list = getFromLocalStorage();
  list.slice().reverse().forEach((item, i) => {
    ul.append(createLi(i));
  });
  document.body.append(ul);
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

  const editField = createInput('text', 'edit');
  const dateField = createInput('date', 'newDue');
  e.target.parentElement.append(editField.input);
  e.target.parentElement.append(dateField.input);
  console.log(`edit field ${editField.input}`);
  const saveBtn = createBtn('SAVE', handleEdit);
  e.target.parentElement.append(saveBtn);
  const cancelBtn = createBtn('CANCEL', removeEditField);
  e.target.parentElement.append(cancelBtn);
  document.querySelector('#SAVE-btn').setAttribute('disabled', '');
  // }
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
  component,
  createInput,
  createLi,
  createBtn,
  createList,
  clearList,
  clearLocalStorage,
  autoToggleSave,
};
