import {
  component,
  
  createBtn,
  createInput,
  createList,
} from './dom.js';
import { addItemToList, handleAdd} from './logic.mjs';
import './style.css';

document.body.appendChild(component());
const el = document.querySelector('div');
el.append(createBtn('ADD', handleAdd));
const addBtn = document.querySelector('.add')
const text = createInput('text', 'todo');
const date = createInput('date', 'date');


el.append(text.input);
el.append(date.input);

createList();
