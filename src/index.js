import {
  component,
  
  createBtn,
  createInput,
  createList,
} from './dom.js';
import { addItemToList, toDoList} from './logic.mjs';
import './style.css';

document.body.appendChild(component());
const el = document.querySelector('div');
el.append(createBtn('ADD'));
const instance = createInput('number', 'phone');

el.append(instance.input);
addItemToList();
addItemToList();
addItemToList();
createList(toDoList);
