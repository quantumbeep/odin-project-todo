import {
  autoToggleSave,
  createList,
  header,
  removeEditField,
  reset,
  showEditField,
} from './dom.js';
import { handleAdd, handleDel, handleEdit, clearInputs } from './logic.mjs';
import './reset.css';
import './style.css';

const hed = header();
document.body.append(hed);
const inputProject = document.querySelector('.input-project')
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
clearInputs()
createList();
document.querySelector('ul').addEventListener('input', autoToggleSave);
