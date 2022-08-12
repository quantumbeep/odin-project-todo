import {
  clearList,
  clearLocalStorage,
  component,
  createBtn,
  createInput,
  createList,
  autoToggleSave
  
} from './dom.js';
import { handleAdd } from './logic.mjs';
import './style.css';

document.body.appendChild(component());
const el = document.querySelector('div');
el.append(createBtn('ADD'));
const addBtn = document.querySelector('.ADD')
addBtn.addEventListener('click', handleAdd)
el.append(
  createBtn('RESET', function () {
    clearLocalStorage();
    clearList()
    createList();
  })
);
const text = createInput('text', 'todo');
const date = createInput('date', 'date');

el.append(text.input);
el.append(date.input);
el.append(text.label);
el.append(date.label);

createList();
document.querySelector('body').addEventListener('input', autoToggleSave);

