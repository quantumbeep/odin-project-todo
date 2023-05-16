import { format, parseISO } from 'date-fns';
import { add, isArray } from 'lodash';
import { getFromLocalStorage, isSame } from './logic.mjs';

const createHeader = () => {
  const header = document.createElement('header');
  const mainForm = document.createElement('form');
  const text = createInput('text', 'project');
  const date = createInput('date', 'date');
  const addItemBtn = createButton('ADD');
  const resetBtn = createButton('RESET');
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

const createButton = (name) => {
  const buttonEl = document.createElement('button');
  buttonEl.textContent = name;
  buttonEl.classList.add(name);
  buttonEl.setAttribute('id', `${name}-btn`);
  return buttonEl;
};

// const createItem = (item) => {
//   const listItem = document.createElement('li');
//   const itemId = document.createElement('p');
//   const itemTitle = document.createElement('p');
//   listItem.classList.add(`li-${index}`);
//   itemTitle.textContent = item.projectText
//     ? `${item.projectText}`
//     : `${item.taskText}`;
//   itemId.textContent = `${item.dateCreated}`;
//   listItem.append(itemId);
//   listItem.append(itemTitle);
//   if (item.projectText) {
//     listItem.classList.add('project');
//   } else {
//     listItem.classList.add('task');
//   }
//   return listItem;
// };

// const createLi = (item) => {
//   console.log({item});
//   if (item.list) {
//     const li = document.createElement('li');
//     const addTaskBtn = createButton('ADD');
//     const delBtn = createButton('DEL');
//     const editBtn = createButton('EDIT');
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
//   if (item.taskUl) {
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
    console.log({ item });
    const listItem = document.createElement('li');
    const itemId = document.createElement('p');
    const itemName = document.createElement('p');
    const itemDue = document.createElement('p');

    listItem.append(itemId);
    listItem.append(itemName);
    listItem.append(itemDue);

    itemName.classList.add('name');

    const projectUl = document.querySelector('ul.projects');
    const taskUl = document.querySelector('ul.tasks');
    projectUl.append(listItem);

    Object.entries(item).forEach(([key, value]) => {
      switch (key) {
        case 'projectText':
          itemName.textContent = value;
          break;
        case 'dueDate':
          itemDue.textContent = value;
          break;
        case 'dateCreated':
          itemId.textContent = value;
          listItem.setAttribute('id', value);
          break;
        case 'taskText':
          itemName.textContent = value;
          taskUl.append(listItem);
          break;
        case 'taskList':
          listItem.addEventListener('click', (e) => {
            if (value.length > 0) {
              const clickedProject = e.target.closest('li').id;
              const targetProject = list.find(
                (item) => item.dateCreated.toString() === clickedProject
              );
              console.log({ targetProject });
              taskUl.textContent = '';
              createList(value);
            } else {
              taskUl.textContent = '';
            }
          });
          break;
        default:
          break;
      }
    });
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
  const tl = document.querySelector('.tasks');
  pl.replaceChildren();
  tl.replaceChildren();
};

//delete all data from browser local storage
const clearLocalStorage = () => {
  localStorage.clear();
  console.log('local cleared');
};

//create and show the edit input fields
const showEditField = (e) => {
  //target should be EDIT button element
  console.log(e.target);

  //replace EDIT button with DONE button
  e.target.textContent = 'DONE';
  e.target.classList.remove('EDIT');
  e.target.id = 'DONE-btn';
  const projectUl = document.querySelector('ul.projects');

  //grab the id of the li element
  const itemId = e.target.closest('li').id;
  console.log({ itemId });

  //make p element the project ID, editable
  const nameEl = e.target.closest('li').querySelector('p.name');
  nameEl.contentEditable = true;
  console.log({ nameEl });

  //move cursor to now editable name field
  nameEl.focus({ focusVisible: true });

  //get 'nameEl' data from local storage to compare
  const list = getFromLocalStorage();
  const foundItem = list.find((item) => item.dateCreated.toString() === itemId);
  const { projectText } = foundItem;

  nameEl.addEventListener('input', (e) => {
    console.log('fired!');
    console.log(nameEl.textContent);
    if (nameEl.textContent !== projectText) {
      console.log('do you want to save the changes you have made?');
      console.log(e.target.parentNode);
      e.target.parentNode.querySelector('button').id = 'SAVE-btn';
      e.target.parentNode.querySelector('button').textContent = 'SAVE';
    } else {
      e.target.parentNode.querySelector('button').id = 'DONE-btn';
      e.target.parentNode.querySelector('button').textContent = 'DONE';
    }
  });
};

const handleDone = (e) => {
  console.log(e.target);
  e.target.parentNode.querySelector('button').id = 'EDIT-btn';
  e.target.parentNode.querySelector('button').textContent = 'EDIT';
  const nameEl = e.target.closest('li').querySelector('p.name');
  nameEl.contentEditable = false;
};

//note to self: integrate into handleDone and showEditField functions as one fn
const handleSave = (e) => {
  console.log(e.target);
  //get id of save target from element
  const targetId = e.target.parentNode.id;
  //assign updated data to const newData for later update
  const newData = e.target.parentNode.querySelector('p.name').textContent;

  //get the list data from local storage

  const list = getFromLocalStorage();

  //find the item in data that matches SAVE button event.target
  const foundItem = list.find(
    (item) => item.dateCreated.toString() === targetId
  );
  const { projectText } = foundItem;

  //update the item with newData
  console.log({ foundItem });
  const updatedItem = { ...foundItem, projectText: newData };
  const targetIndex = list.indexOf(foundItem);

  //splice it into list
  list.splice(targetIndex, 1, updatedItem);
  const userSelection = confirm(
    `Confirm save? from ${projectText} to ${newData}`
  );
  if (userSelection) {
    localStorage.setItem('list', JSON.stringify(list));
  } else {
  }

  e.target.parentNode.querySelector('p.name').textContent;
  e.target.parentNode.querySelector('button').id = 'EDIT-btn';
  e.target.parentNode.querySelector('button').textContent = 'EDIT';
  const nameEl = e.target.closest('li').querySelector('p.name');
  nameEl.contentEditable = false;
};

const removeEditField = () => {
  const allDisabledBtns = document.querySelector('button:([disabled])');
  allDisabledBtns.setAttribute('disabled', false);
  clearList();
  createList();
};

const autoToggleSave = (e) => {
  //target should be 'p' element with class 'name'
  console.log(e.target);
  const oldContent = e.target.textContent;
  console.log({ oldContent });
  console.log({ oldContent });
  if (true) {
    //do nothing
  } else {
    //change done button to save button
    e.target.parentNode.querySelector('button#DONE-btn').id = 'SAVE-btn';
    e.target.parentNode.querySelector('button#DONE-btn').textContent = 'SAVE';
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

const hoverProject = (e) => {
  console.log(e.target);
  if (
    e.target.tagName === 'LI' &&
    e.target.id &&
    e.target !== document.querySelector('ul.tasks li') &&
    !e.target.parentNode.querySelector('#DONE-btn') &&
    !e.target.parentNode.querySelector('#SAVE-btn') &&
    !e.target.parentNode.querySelector('#EDIT-btn')
  ) {
    e.target.classList.add('hovering');
    console.log('class hovering added');
    const editButton = createButton('EDIT');
    e.target.append(editButton);
  }
};

//removes 'hovering' class from li so css returns to base color
//grabs and removes edit button from target li
const unHoverProject = (e) => {
  e.target.classList.remove('hovering');
  const toBeRemovedNode = document.querySelector('#EDIT-btn');
  toBeRemovedNode.remove();
  setTimeout(() => {
    console.log({ toBeRemovedNode });
  }, 1000);
};

export {
  createHeader,
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
  createButton,
  hoverProject,
  unHoverProject,
  handleDone,
  handleSave,
};
