import { add } from 'lodash';
import Icon from './ice.jpg';
import { getFromLocalStorage, handleDel } from './logic.mjs';
import printMe from './print.js';

const component = () => {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = ['Hello', 'there'].join(' ');
  element.classList.add('hello');
  // Add the image to our existing div.
  const myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
};

//DOM creation
const createBtn = (btnName, btnFn) => {
  const btn = document.createElement('button');
  btn.textContent = btnName;
  btn.classList.add(`${btnName}`);
  btn.addEventListener('click', btnFn);
  return btn;
};

const createLi = (i) => {
  const li = document.createElement('li');
  if (i) {
    li.classList.add(`li-${i}`, 'li');
  } else {
    li.classList.add('li');
  }

  const list = getFromLocalStorage();
  const id = document.createElement('p');
  const textnode2 = document.createElement('p');
  const textnode3 = document.createElement('p');
  id.textContent = list[i].dateCreated;
  textnode2.textContent = list[i].toDoText;
  textnode3.textContent = list[i].dueDate;
  li.setAttribute('id', list[i].dateCreated)
  li.append(id);
  li.append(textnode2);
  li.append(textnode3);

  const delBtn = createBtn('DEL', handleDel);
  li.append(delBtn);
  console.log('li created');
  return li;
};

const createInput = (type, name) => {
  const input = document.createElement('input');
  input.setAttribute('type', type);
  input.setAttribute('value', name);
  input.setAttribute('name', name);
  input.setAttribute('placeholder', `Placeholder for ${name}`);
  input.classList.add(`input-${type}`);

  const label = document.createElement('label');
  label.setAttribute('for', input.name);
  label.textContent = 'label for input';
  return { input, label };
};

const clearList = () => {
  const ul = document.querySelector('ul');
  ul.remove();
};

const clearLocalStorage = () => {
  localStorage.clear();
  console.log('local cleared');
}

const createList = () => {
  const ul = document.createElement('ul');
  const list = getFromLocalStorage();
  list.map((item, i) => {
    ul.append(createLi(i));
  });
  document.body.append(ul);
};

export { component, createInput, createLi, createBtn, createList, clearList, clearLocalStorage};
