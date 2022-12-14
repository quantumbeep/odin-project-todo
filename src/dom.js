import { format, parseISO } from 'date-fns';
import { add, isArray } from 'lodash';
import Icon from './ice.jpg';
import { getFromLocalStorage, isSame } from './logic.mjs';

const header = () => {
  const header = document.createElement('header');
  const mainForm = document.createElement('form');
  const text = createInput('text', 'project');
  const date = createInput('date', 'date');
  const addItemBtn = ButtonFactory('ADD');
  const resetBtn = ButtonFactory('RESET');
  header.classList.add('header');
  mainForm.classList.add('main-form');

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
  const taskQuickInput = createInput('text', 'task');
  taskQuickInput.input.setAttribute('value', '');
  taskQuickInput.input.setAttribute('placeholder', 'Quick add a task here...');

  //preview of most recent 3 tasks added
  // const previewTaskList = document.createElement('ul');
  // previewTaskList.classList.add('preview-list');
  // const task1 = document.createElement('li');
  // const task2 = document.createElement('li');
  // const task3 = document.createElement('li');
  // task1.textContent = item.taskList[0]?.taskText || '';
  // task2.textContent = item.taskList[1]?.taskText || '';
  // task3.textContent = item.taskList[2]?.taskText || '';
  // previewTaskList.append(task1, task2, task3);

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
  dueDate.textContent = format(parseISO(item.dueDate), 'EEEE, MMM do, yyyy');
  id.textContent = `ID: ${item.dateCreated}`;
  addTaskBtn.classList.add('add-task-btn');

  li.append(dataContainer);
  // li.append(previewTaskList);
  li.append(btnContainer);
  dataContainer.append(project);
  dataContainer.append(dueDate);
  dataContainer.append(id);
  btnContainer.append(delBtn);
  btnContainer.append(editBtn);
  btnContainer.append(addTaskBtn);
  btnContainer.append(taskQuickInput.input);

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

const createList = (list) => {
  const ul = document.createElement('ul');
  const projectUl = document.querySelector("ul[class='projects']");
  if (!projectUl) {
    document.body.append(ul);
    ul.classList.add('projects');
  } else {
    console.log(projectUl.lastElementChild);
    const currentProject = projectUl.lastElementChild;
    currentProject.append(ul);
    ul.classList.add('tasks');
  }
  const copyList = list.slice();
  console.log(copyList);
  copyList.reverse().forEach((item, index) => {
    if (item.projectText && copyList.length > 0 && item.taskList.length > 0) {
      console.log('reached if block');
      const li = createLi(item, list);
      console.log(copyList.indexOf(item));
      ul.append(li);
      createList(item.taskList);
    } else if (item.projectText && copyList.length > 0) {
      console.log('reached else if block');
      const li = createLi(item, list);
      console.log(copyList.indexOf(item));
      ul.append(li);
    } else {
      console.log('reached else block');
      const taskLi = document.createElement('li');
      taskLi.textContent = item.taskText;
      console.log(taskLi.closest('li'));
      ul.append(taskLi);
    }
  });
  console.log('finished creating list');
};

// const createList = () => {
//   const ul = document.createElement('ul');
//   document.body.append(ul);

//   //retrieve data list and render it
//   const list = getFromLocalStorage();
//   const copyList = list.slice();
//   console.log(copyList);

//   copyList.reverse().forEach((item) => {
//     if (item.projectText) {
//       const li = createLi(item, list);
//       console.log(copyList.indexOf(item));
//       ul.append(li);
//     } else if() {

//     }
//   });
// };

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
  //create and show the edit input fields
  const editForm = document.createElement('form');
  const parentLi = e.target.closest('li');
  const childRef = e.target.closest('div');
  console.log(e.target.closest('div'));
  parentLi.insertBefore(editForm, childRef);
  editForm.setAttribute('position', 'absolute');
  editForm.style.zIndex = '1';
  const editField = createInput('text', 'edit');
  const dateField = createInput('date', 'newDue');
  const saveBtn = ButtonFactory('SAVE');
  const cancelBtn = ButtonFactory('CANCEL');
  console.log(e.target.closest('li').querySelector('.item-project').innerHTML);
  console.log(e.target.closest('li').querySelector('.item-due').innerHTML);
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

  //disable all other edit and del buttons when editing an item
  const notCancelBtns = document.querySelectorAll('button:not(#CANCEL-btn)');
  console.log({ notCancelBtns });
  notCancelBtns.forEach((element) => element.setAttribute('disabled', ''));
};

const removeEditField = () => {
  const allDisabledBtns = document.querySelector('button:([disabled])');
  allDisabledBtns.setAttribute('disabled', false);
  clearList();
  createList();
};

const autoToggleSave = (e) => {
  const target = e.target;
  console.log(target.id);
  if (isSame(e)) {
    //disable save button
    document.querySelector('#SAVE-btn').setAttribute('disabled', '');
  } else {
    //enable save button
    document.querySelector('#SAVE-btn').removeAttribute('disabled');
  }
};

const highlightProject = (e) => {
  if (
    e.target.tagName !== 'BUTTON' ||
    e.target.tagName !== 'INPUT' ||
    e.target !== 'li li'
  ) {
    const notActiveLi = document.querySelectorAll('li:not(li li)');
    console.log(notActiveLi);
    notActiveLi.forEach((element) => element.classList.remove('active'));
    const activeLi = e.target.closest('li:not(li li)');
    activeLi.classList.add('active');
    console.log('class active added');
  }
};

const showProject = (e) => {
  createList();
};

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
  highlightProject,
  showProject,
};
