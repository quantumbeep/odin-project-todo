import { add, isArray } from 'lodash';
import Icon from './ice.jpg';
import { checkChange, getFromLocalStorage } from './logic.mjs';

const header = () => {
  const header = document.createElement('header');
  const mainForm = document.createElement('form');
  const text = createInput('text', 'project');
  const date = createInput('date', 'date');
  const addItemBtn = ButtonFactory('ADD');
  const resetBtn = ButtonFactory('RESET');
  header.classList.add('header');
  mainForm.classList.add('main-form');

  // const myIcon = new Image();
  // myIcon.src = Icon;
  // header.append(myIcon);

  header.append(mainForm);

  mainForm.append(text.input);
  mainForm.append(text.label);
  mainForm.append(date.input);
  mainForm.append(date.label);
  mainForm.append(addItemBtn);
  mainForm.append(resetBtn);
  return header;
};

const ButtonFactory = (name) => {
  const buttonEl = document.createElement('button');
  buttonEl.textContent = name;
  buttonEl.classList.add(name);
  buttonEl.setAttribute('id', `${name}-btn`);
  return buttonEl;
};

const createLi = (item, list) => {
  const li = document.createElement('li');
  const btnContainer = document.createElement('div');
  const dataContainer = document.createElement('div');
  const id = document.createElement('p');
  const project = document.createElement('p');
  const dueDate = document.createElement('p');
  const addTaskBtn = ButtonFactory('ADD');
  const delBtn = ButtonFactory('DEL');
  const editBtn = ButtonFactory('EDIT');

  const index = list.indexOf(item);
  li.classList.add(`li-${index}`, 'li');
  li.classList.add('li');
  btnContainer.classList.add('li-btn-container');
  dataContainer.classList.add('li-data-container');

  li.setAttribute('id', item.dateCreated);
  id.classList.add('item-id');
  project.classList.add('item-project');
  dueDate.classList.add('item-due');
  project.textContent = item.projectText;
  dueDate.textContent = item.dueDate
  id.textContent = `ID: ${item.dateCreated}`;

  li.append(dataContainer);
  li.append(btnContainer);
  dataContainer.append(project);
  dataContainer.append(dueDate);
  dataContainer.append(id);
  btnContainer.append(delBtn);
  btnContainer.append(editBtn);
  btnContainer.append(addTaskBtn);

  console.log('li created');
  return li;
};

const createInput = (type, name) => {
  const input = document.createElement('input');
  input.setAttribute('type', type);
  input.setAttribute('value', name);
  input.setAttribute('name', name);
  input.setAttribute('id', `input-${name}`);
  input.setAttribute('placeholder', `Enter the ${name} here...`);
  input.classList.add(`input-${type}`, `input-${name}`);

  const label = document.createElement('label');
  label.setAttribute('for', input.name);
  label.textContent = `${input.name}`;
  return { input, label };
};

const createList = () => {
  const ul = document.createElement('ul');
  document.body.append(ul);

  //retrieve data list and render it
  const list = getFromLocalStorage();
  const copyList = list.slice();
  console.log(copyList);

  copyList.reverse().forEach(function (item) {
    if (item.projectText) {
      const li = createLi(item, list);
      console.log(copyList.indexOf(item));
      ul.append(li);
    }
  });
};

const reset = () => {
  clearLocalStorage();
  clearList();
  createList();
};

const clearList = () => {
  const ul = document.querySelector('ul');
  ul.remove();
};

const clearLocalStorage = () => {
  localStorage.clear();
  console.log('local cleared');
};

const showEditField = (e) => {
  //disable all other edit and del buttons when editing an item
  const allEditBtns = document.querySelectorAll('.EDIT');
  const allDelBtns = document.querySelectorAll('.DEL');
  allEditBtns.forEach((element) => element.setAttribute('disabled', ''));
  allDelBtns.forEach((element) => element.setAttribute('disabled', ''));

  //create and show the edit input fields
  const editForm = document.createElement('form');
  const parentLi = e.target.closest('li');
  const childRef = e.target.closest('div');
  console.log(e.target.closest('div'));
  parentLi.insertBefore(editForm, childRef);
  editForm.setAttribute('position', 'absolute');
  editForm.style.zIndex = '1';
  // e.target.parentElement.append(editForm);
  const editField = createInput('text', 'edit');
  editField.input.setAttribute('value', 'hi');
  const dateField = createInput('date', 'newDue');
  const saveBtn = ButtonFactory('SAVE');
  const cancelBtn = ButtonFactory('CANCEL');
  console.log(e.target.closest('li').querySelector('.item-project').innerHTML);
  editField.input.value = e.target
    .closest('li')
    .querySelector('.item-project').innerHTML;
  dateField.input.value = e.target
    .closest('li')
    .querySelector('.item-due').innerHTML;
  editForm.append(editField.input);
  editForm.append(saveBtn);
  editForm.append(dateField.input);
  editForm.append(cancelBtn);
};

const removeEditField = () => {
  clearList();
  createList();
};

const autoToggleSave = (e) => {
  const target = e.target;
  console.log(target.id);
  if (target && target.id === 'input-edit' && checkChange(e)) {
    //disable save button
    document.querySelector('#SAVE-btn').setAttribute('disabled', '');
  } else {
    //enable save button
    document.querySelector('#SAVE-btn').removeAttribute('disabled');
  }
};

const viewProject = () => {};

export {
  header,
  createInput,
  createLi,
  createList,
  clearList,
  clearLocalStorage,
  autoToggleSave,
  showEditField,
  removeEditField,
  reset,
};
