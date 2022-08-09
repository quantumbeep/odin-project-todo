import { add } from 'lodash';
import Icon from './ice.jpg';
import { getFromLocalStorage, receiveItemData } from './logic.mjs';
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

  const data = receiveItemData();
  const list = getFromLocalStorage();
  const textnode1 = document.createTextNode(data.toDoText);
  const textnode2 = document.createTextNode(list[i].list.value);
  li.textContent = data.list;
  li.append(textnode1);
  li.append(textnode2);
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

const createList = () => {
  const ul = document.createElement('ul');
  const toDoList = getFromLocalStorage();
  toDoList.map((item, i) => {
    ul.append(createLi(i));
  });
  document.body.append(ul);
};

export { component, createInput, createLi, createBtn, createList };
