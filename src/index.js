import {
  autoToggleSave,
  createButton,
  createHeader,
  createList,
  highlightProject,
  removeEditField,
  reset,
  showEditField,
} from './dom.js';
import {
  clearInputs,
  getFromLocalStorage,
  handleAdd,
  handleDel,
  handleEdit,
} from './logic.mjs';
import './reset.css';
import './style.css';

const header = createHeader();
document.body.append(header);
// const inputProject = document.querySelector('.input-project');

const wrapperDiv = document.createElement('div');
const projectList = document.createElement('ul');
const taskList = document.createElement('ul');
wrapperDiv.classList.add('wrapper');
projectList.classList.add('projects');
taskList.classList.add('tasks');
document.body.append(wrapperDiv);
wrapperDiv.append(projectList);
wrapperDiv.append(taskList);

//event delegation for buttons within li element
document.body.addEventListener('click', (e) => {
  console.log(e.target);
  if (e.target.id === 'ADD-btn') {
    handleAdd(e);
  } else if (e.target.id === 'RESET-btn') {
    reset();
  } else if (e.target.id === 'EDIT-btn') {
    showEditField(e);
  } else if (e.target.id === 'SAVE-btn') {
    handleEdit(e);
  } else if (e.target.id === 'DEL-btn') {
    handleDel(e);
  } else if (e.target.id === 'CANCEL-btn') {
    removeEditField(e);
  }
});
const projectL = document.querySelector('ul.projects');
console.log({ projectL });
projectL.addEventListener('mouseover', (e) => {
  if (
    e.target.tagName === 'LI' &&
    e.target.id !== null &&
    e.target.id !== undefined &&
    !e.target.querySelector('button')
  ) {
    console.log(e.target.id);
    const editIcon = createButton('EDIT');
    e.target.append(editIcon);
  }
});
projectL.addEventListener('mouseout', (e) => {
  if (
    e.target.tagName === 'LI' &&
    e.target.id !== null &&
    e.target.id !== undefined &&
    e.target.querySelector('button')
  ) {
    console.log(e.target.id);

    e.target.removeChild(e.target.querySelector('button'));
  }
});

clearInputs();
//retrieve data list and render it
const list = getFromLocalStorage();
console.log('getting list from local storage...');
console.log({ list });
createList(list);

const ul = document.querySelector('ul');
ul.addEventListener('input', (e) => {
  autoToggleSave(e);
});
const elNotInpBut = document.querySelectorAll(
  'ul.tasks:not(input):not(button)'
);
// console.log({ elNotInpBut });
