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

const createItem = (item) => {
  const listItem = document.createElement('li');
  const itemId = document.createElement('p');
  const itemTitle = document.createElement('p');
  // listItem.classList.add(`li-${index}`);
  itemTitle.textContent = item.projectText
    ? `${item.projectText}`
    : `${item.taskText}`;
  itemId.textContent = `${item.dateCreated}`;
  listItem.append(itemId);
  listItem.append(itemTitle);
  if (item.projectText) {
    listItem.classList.add('project');
  } else {
    listItem.classList.add('task');
  }
  return listItem;
};

// const createLi = (item) => {
//   console.log({item});
//   if (item.list) {
//     const li = document.createElement('li');
//     const addTaskBtn = ButtonFactory('ADD');
//     const delBtn = ButtonFactory('DEL');
//     const editBtn = ButtonFactory('EDIT');
//     const taskQuickInput = createInput('text', 'task');
//     const btnContainer = document.createElement('div');
//     const dataContainer = document.createElement('div');
//     const id = document.createElement('p');
//     const project = document.createElement('p');

//     taskQuickInput.input.setAttribute('value', '');
//     taskQuickInput.input.setAttribute(
//       'placeholder',
//       'Quick add a task here...'
//     );

//     const index = indexOf(item);
//     li.classList.add(`li-${index}`);
//     li.classList.add('li');
//     btnContainer.classList.add('li-btn-container');
//     dataContainer.classList.add('li-data-container');
//     const dueDate = document.createElement('p');
//     dueDate.classList.add('item-due');
//     dueDate.textContent = format(parseISO(item.dueDate), 'EEEE, MMM do, yyyy');

//     dataContainer.append(dueDate);
//     li.setAttribute('id', item.dateCreated);
//     id.classList.add('item-id');
//     project.classList.add('item-project');
//     project.textContent = item.projectText;
//     id.textContent = `ID: ${item.dateCreated}`;
//     addTaskBtn.classList.add('add-task-btn');

//     li.append(dataContainer);
//     li.append(btnContainer);
//     dataContainer.append(project);
//     dataContainer.append(id);
//     btnContainer.append(delBtn);
//     btnContainer.append(editBtn);
//     btnContainer.append(addTaskBtn);
//     btnContainer.append(taskQuickInput.input);
//     console.log('li created');
//     return li;
//   }
//   if (item.taskList) {
//     const taskItem = document.createElement('li');
//     const taskText = document.createElement('p');
//     const taskId = document.createElement('p');
//     taskText.textContent = `Task: ${item.taskText}`;
//     taskId.textContent = item.dateCreated;
//     taskItem.append(taskText);
//     taskItem.append(taskId);
//     return taskItem;
//   }
// };

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
  let index = 0;

  const inner = () => {
    const item = list[index];
    console.log({ index });
    console.log(typeof item);
    console.log({ item });
    const projectItem = document.createElement('li');
    const projectId = document.createElement('p');
    const projectTitle = document.createElement('p');
    const projectDue = document.createElement('p');

    projectItem.append(projectId);
    projectItem.append(projectTitle);
    projectItem.append(projectDue);

    const pWrapper = document.querySelector('.projects');
    const dWrapper = document.querySelector('.details');
    pWrapper.append(projectItem);

    Object.entries(item).forEach(([key, value]) => {
      switch (key) {
        case 'projectText':
          console.log(value);
          projectTitle.textContent = value;
          break;
        case 'dueDate':
          console.log(value);
          projectDue.textContent = value;
          break;
        case 'dateCreated':
          console.log(value);
          projectId.textContent = value;
          projectItem.setAttribute('id', value);
          break;
        case 'taskText':
          console.log({ value });
          projectTitle.textContent = value;
          dWrapper.append(projectItem);
          break;
        case 'taskList':
          console.log('at tasks');
          console.log(value);
          console.log(typeof value);

          if (value.length > 0) {
            console.log('reached tasklist');
            projectItem.addEventListener('click', (e) => {
              const clickedProject = e.target.closest('li').id;
              const targetProject = list.find(
                (item) => item.dateCreated.toString() === clickedProject
              );
              console.log({targetProject});
              createList(value);
            });
          } else {
            console.log('no tasks to add');
          }
          break;
        default:
          break;
      }
    });
    console.log({ index });
    if (index < list.length - 1) {
      index++;
      inner();
    }
  };
  inner();
};

const reset = () => {
  clearLocalStorage();
  clearList();
  createList();
};

const clearList = () => {
  const pl = document.querySelector('.projects');
  console.log({ pl });
  const tl = document.querySelector('.details');
  pl.replaceChildren();
  tl.replaceChildren();
};

const clearLocalStorage = () => {
  localStorage.clear();
  console.log('local cleared');
};

//Create and show the edit input fields
const showEditField = (e) => {
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

  //Disable all other edit and del buttons when editing an item
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
  console.log(e.target);
  if (
    e.target.tagName !== 'BUTTON' ||
    e.target.tagName !== 'INPUT' ||
    e.target !== document.querySelector('ul.tasks li')
  ) {
    const notActiveLi = document.querySelectorAll('li:not(li li)');
    console.log(notActiveLi);
    notActiveLi.forEach((element) => element.classList.remove('active'));
    const activeLi = e.target.closest('li:not(li li)');
    activeLi.classList.add('active');
    console.log('class active added');
  }
};

export {
  header,
  createInput,
  // createLi,
  createList,
  clearList,
  clearLocalStorage,
  autoToggleSave,
  showEditField,
  removeEditField,
  reset,
  highlightProject,
};
