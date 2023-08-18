import { format, parseISO } from 'date-fns';
import { add, isArray } from 'lodash';
import { getFromLocalStorage, isDataOKtoProcess, isSame } from './logic.mjs';

const createHeader = () => {
  const header = document.createElement('header');
  const mainForm = document.createElement('form');
  const text = createInput('text', 'project');
  const date = createInput('date', 'date');
  const addBtn = createButton('ADD');
  const resetBtn = createButton('RESET');
  header.classList.add('header');
  mainForm.classList.add('mainForm');
  const { input, label } = createInput('text', 'task');

  header.append(mainForm);

  mainForm.append(text.input);
  mainForm.append(text.label);
  mainForm.append(date.input);
  mainForm.append(date.label);
  mainForm.append(addBtn);
  mainForm.append(resetBtn);
  mainForm.append(input);
  mainForm.append(label);
  const taskBtn = createButton('ADD');
  let {id} = taskBtn;
  console.log(id); //ADD-btn
  id = 'task-btn'
  
  mainForm.append(taskBtn);
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
  input.setAttribute('id', `${name}`);
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
    const result = isDataOKtoProcess(item);
    console.log(result);
    if (isDataOKtoProcess(item)) {
      console.log('creating list!');

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
            if (value.length > 0) {
              console.log({ targetProject });
              taskUl.textContent = '';
              createList(value);
            } else {
              // taskUl.textContent = '';
            }

            break;
          default:
            alert('There are no projects. Please add one first.');
            break;
        }
      });
    } else {
      console.error('data did not pass isDataOKtoProcess');
      return;
    }
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

//delete all data from browser local storage
const clearLocalStorage = () => {
  localStorage.clear();
  console.log('local cleared');
};

const clearList = () => {
  const pl = document.querySelector('ul.projects');
  const tl = document.querySelector('ul.tasks');
  pl.replaceChildren();
  tl.replaceChildren();
};

// USER CAN CLICK ON EDIT BUTTON WHILE HOVERING OVER EACH
// PROJECT TO CHANGE THE NAME OF THE PROJECT
const editProjectName = (e) => {
  //target should be EDIT button element
  console.log(e.target);

  //add 'editmode' to classlist of ul
  e.target.closest('ul').classList.add('editmode');

  //replace EDIT button with DONE button
  e.target.textContent = 'DONE';
  e.target.classList.remove('EDIT');
  e.target.classList.add('DONE');
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
      e.target.parentNode.querySelector('button').classList.add('DONE');
      e.target.parentNode.querySelector('button').textContent = 'DONE';
    }
  });
};

const handleDone = (e) => {
  console.log(e.target);
  console.log(e.target.id);
  e.target.id = 'EDIT-btn';
  console.log(e.target.id);

  e.target.textContent = 'EDIT';
  const nameEl = e.target.closest('li').querySelector('p.name');
  nameEl.contentEditable = false;
  e.target.closest('ul').classList.remove('editmode');
};

const handleSave = (e) => {
  //get id of save target from element
  const targetId = e.target.parentNode.id;
  //assign updated data to const newData for later update
  const newData = e.target.parentNode.querySelector('p.name').textContent;

  //get the list data from local storage
  const list = getFromLocalStorage();

  //find the item in list that matches targetId
  const foundItem = list.find(
    (item) => item.dateCreated.toString() === targetId
  );
  const { projectText } = foundItem;

  //update the item with newData
  console.log({ foundItem });
  const updatedItem = { ...foundItem, projectText: newData };
  const targetIndex = list.indexOf(foundItem);

  //splice it into list
  const userSelection = confirm(
    `Confirm the change? from ${projectText} to ${newData}`
  );
  if (userSelection) {
    list.splice(targetIndex, 1, updatedItem);
    localStorage.setItem('list', JSON.stringify(list));
  } else {
    e.target.parentNode.querySelector('p.name').textContent = projectText;
  }

  e.target.parentNode.querySelector('button').id = 'EDIT-btn';
  e.target.parentNode.querySelector('button').textContent = 'EDIT';
  const nameEl = e.target.closest('li').querySelector('p.name');
  nameEl.contentEditable = false;
  e.target.closest('ul').classList.remove('editmode');
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

const setActive = (e) => {
  const nonActiveProjects = document.querySelectorAll('li:not(li li)');
  nonActiveProjects.forEach((project) => project.classList.remove('active'));
  const activeProject = e.target.closest('li:not(li li)');
  activeProject.classList.add('active');
  const taskUl = document.querySelector('ul.tasks');
  const projectName = document.createElement('div');
  projectName.classList.add('projectName');
  console.log(e.target.closest('li').querySelector('p.name').textContent);
  projectName.textContent = e.target
    .closest('li')
    .querySelector('p.name').textContent;
  taskUl.replaceChildren();
  taskUl.prepend(projectName);
};

let hoveredLi = null;
const hoverProject = (e) => {
  console.log(!document.querySelector('#EDIT-btn'));
  if (
    e.target.tagName === 'LI' &&
    !e.target.closest('ul').classList.contains('editmode')
  ) {
    hoveredLi = e.target;
    hoveredLi.classList.add('hovering');
  }
  if (!e.target.parentNode.querySelector('#EDIT-btn')) {
    const editButton = createButton('EDIT');
    hoveredLi.append(editButton);
  }
};

const unHoverProject = (e) => {
  console.log('unhover');
  if (hoveredLi && !e.target.contains(e.relatedTarget)) {
    hoveredLi.classList.remove('hovering');
    if (document.querySelector('#EDIT-btn')) {
      hoveredLi.querySelector('#EDIT-btn').remove();
    }
    hoveredLi = null;
  }
};

export {
  autoToggleSave,
  clearList,
  clearLocalStorage,
  createButton,
  createHeader,
  createInput,
  createList,
  editProjectName,
  handleDone,
  handleSave,
  hoverProject,
  removeEditField,
  reset,
  setActive,
  unHoverProject,
};
