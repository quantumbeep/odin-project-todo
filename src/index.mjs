import {
  autoToggleSave,
  createHeader,
  createList,
  handleDone,
  handleSave,
  highlightProject,
  hoverProject,
  removeEditField,
  reset,
  showEditField,
  unHoverProject,
} from './dom.mjs';
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

const projectL = document.querySelector('ul.projects');

console.log({ projectL });

projectL.addEventListener('click', (e) => {
  highlightProject(e);
});
projectL.addEventListener('mouseover', (e) => {
  // console.log('mouseover triggered');
  hoverProject(e);
});

clearInputs();
//retrieve data list and render it
const list = getFromLocalStorage();
console.log('getting list from local storage...');
console.log({ list });
createList(list);

//grab all li elements from projects ul
//add event listener to each li for cursor leaving li
//event triggers unHoverProject
const allLiProjects = document.querySelectorAll('ul.projects > li');
console.log({ allLiProjects });
allLiProjects.forEach((element) => {
  element.addEventListener('mouseleave', (e) => {
    // console.log('mouseleave triggered');
    unHoverProject(e);
  });
});

// const ul = document.querySelector('ul');
// ul.addEventListener('input', (e) => {
//   autoToggleSave(e);
// });
const elNotInpBut = document.querySelectorAll(
  'ul.tasks:not(input):not(button)'
);
// console.log({ elNotInpBut });
