import { add } from 'lodash';
import Icon from './ice.jpg';
import { getFromLocalStorage, handleDel, handleEdit, checkChange} from './logic.mjs';
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
  btn.addEventListener('click', btnFn);
  return btn;
};

const createLi = (i) => {
  const li = document.createElement('li');
  if (i) {
    li.classList.add(`li-${i}`, 'li');
  } else {
    li.classList.add('li');
  }

  const list = getFromLocalStorage();
  const id = document.createElement('p');
  const toDo = document.createElement('p');
  const dueDate = document.createElement('p');
  li.setAttribute('id', list[i].dateCreated);
  id.classList.add('item-id');
  toDo.classList.add('item-text');
  dueDate.classList.add('item-due');
  id.textContent = list[i].dateCreated;
  toDo.textContent = list[i].toDoText;
  dueDate.textContent = list[i].dueDate;
  li.append(id);
  li.append(toDo);
  li.append(dueDate);

  const delBtn = createBtn('DEL', handleDel);
  li.append(delBtn);

  const editBtn = createBtn('EDIT', showEditField);
  li.append(editBtn);
  console.log('li created');
  return li;
};

const showEditField = (e) => {
  console.log(e.target);
  console.log(e.target.id);
  console.log(typeof e.target.id);
  console.log(e.target.parentElement);
  //dom create input field - text, due date
  // if(e.target && e.target.id == 'EDIT-btn'){
  if (true) {
    const editField = createInput('text', 'edit');
    const dateField = createInput('date', 'newDue');
    e.target.parentElement.append(editField.input);
    e.target.parentElement.append(dateField.input);
    console.log(`edit field ${editField.input}`);
    const saveBtn = createBtn('SAVE', handleEdit);
    e.target.parentElement.append(saveBtn);
    document.querySelector('#SAVE-btn').setAttribute('disabled', '');
  }
};

const autoToggleSave = (e) => {
  console.log(checkChange(e));
  checkChange(e)
    ? document.querySelector('#SAVE-btn').removeAttribute('disabled')
    : document.querySelector('#SAVE-btn').setAttribute('disabled', '');
};

const createInput = (type, name) => {
  const input = document.createElement('input');
  input.setAttribute('type', type);
  input.setAttribute('value', name);
  input.setAttribute('name', name);
  input.setAttribute('id', `input-${name}`);
  input.setAttribute('placeholder', `Placeholder for ${name}`);
  input.classList.add(`input-${type}`, `input-${name}`);

  const label = document.createElement('label');
  label.setAttribute('for', input.name);
  label.textContent = `${input.name}`;
  return { input, label };
};

const clearList = () => {
  const ul = document.querySelector('ul');
  ul.remove();
};

const clearLocalStorage = () => {
  localStorage.clear();
  console.log('local cleared');
};

const createList = () => {
  const ul = document.createElement('ul');
  const list = getFromLocalStorage();
  list.map((item, i) => {
    ul.append(createLi(i));
  });
  document.body.append(ul);
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
