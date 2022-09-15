import {
  autoToggleSave,
  createList,
  header,
  removeEditField,
  reset,
  highlightProject,
  showEditField,
} from './dom.js';
import { clearInputs, handleAdd, handleDel, handleEdit } from './logic.mjs';
import './reset.css';
import './style.css';

const hed = header();
document.body.append(hed);
const inputProject = document.querySelector('.input-project');
console.log(inputProject);

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
clearInputs();
createList();

const ul = document.querySelector('ul');
ul.addEventListener('input', (e) => {
  autoToggleSave(e);
});
const elNotInpBut = document.querySelectorAll('ul :not(input):not(button)');
console.log(elNotInpBut);

ul.addEventListener('click', (e) => {
  highlightProject(e);
});
