import {
  autoToggleSave,
  clearList,
  createButton,
  createHeader,
  createInput,
  createList,
  editProjectName,
  handleDone,
  handleSave,
  hoverProject,
  removeEditField,
  reset,
  setActive,
  unHoverProject,
} from './dom.js';
import {
  clearInputs,
  deleteLastItem,
  getFromLocalStorage,
  handleAdd,
  handleDel,
  handleEdit,
  isDataOKtoProcess,
} from './logic.mjs';
import './reset.css';
import './style.css';

const header = createHeader();
document.body.append(header);

const wrapperDiv = document.createElement('div');
const projectList = document.createElement('ul');
const taskList = document.createElement('ul');
wrapperDiv.classList.add('wrapper');
projectList.classList.add('projects');
taskList.classList.add('tasks');
document.body.append(wrapperDiv);

wrapperDiv.append(projectList);
wrapperDiv.append(taskList);

const loadPage = () => {
  clearInputs();
  clearList();
  const list = getFromLocalStorage();
  console.log({ list });

  createList(list);

};
//event delegation for buttons within li element
document.body.addEventListener('click', (e) => {
  console.log(e.target);
  if (e.target.matches('.projects li, .projects *:not(button)')) {
    setActive(e);
  } else if (e.target.id === 'ADD-btn') {
    handleAdd(e);
  } else if (e.target.id === 'RESET-btn') {
    reset();
  } else if (e.target.id === 'EDIT-btn') {
    setActive(e);
    editProjectName(e);
  } else if (e.target.id === 'DONE-btn') {
    handleDone(e);
  } else if (e.target.id === 'SAVE-btn') {
    handleSave(e);
  } else if (e.target.id === 'DEL-btn') {
    handleDel(e);
  } else if (e.target.id === 'CANCEL-btn') {
    removeEditField(e);
  }
});



const projectUl = document.querySelector('.projects');

projectUl.addEventListener('mouseout', (e) => {
  unHoverProject(e);
});

projectUl.addEventListener('mouseover', (e) => {
  hoverProject(e);
});

// const relatedTarget = e.relatedTarget;
// console.log(`mouseout related target: ${relatedTarget}`);
// console.log(`mouseout target: ${e.target}`);
// if (e.target.matches('.projects li')) {
// e.target.tagName === 'LI' &&
// !e.target.contains(e.target.relatedTarget) &&
// e.target.querySelector('#EDIT-btn'){
// debouncedUnHover(e);

// const relatedTarget = e.relatedTarget;
// console.log(`mouseover related target: ${relatedTarget}`);
// console.log(`mouseover target: ${e.target}`);

// if (e.target.matches('.projects li')) {
// e.target.tagName === 'LI' &&
// !e.target.contains(e.relatedTarget) &&
// !e.target.querySelector('#EDIT-btn')

// debouncedHover(e);

loadPage();
