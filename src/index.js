import { autoToggleSave, createList, header } from './dom.js';
import { handleAdd, handleDel, handleEdit } from './logic.mjs';
import { removeEditField, showEditField } from './dom.js';
import './style.css';

const hed = header();
document.body.append(hed);

//event delegation for buttons within li element
document.body.addEventListener('click', (e) => {
  console.log(e.target);
  if (e.target.id === 'ADD-btn') {
    handleAdd(e);
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

createList();
document.querySelector('ul').addEventListener('input', autoToggleSave);
