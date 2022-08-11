import {
  clearList,
  clearLocalStorage,
  component,
  createBtn,
  createInput,
  createList,
  
} from './dom.js';
import { handleAdd } from './logic.mjs';
import './style.css';

document.body.appendChild(component());
const el = document.querySelector('div');
el.append(createBtn('ADD', handleAdd));
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

createList();
