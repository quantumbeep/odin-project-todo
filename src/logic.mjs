// let toDoList = [];

//editFn
const editToDo = () => {
  //change the value of 'toDoText' property in toDoItem
};

//delFn

const receiveItemData = () => {
  const toDoInput = document.querySelector('.input-text').value;
  console.log(toDoInput);
  return {
    toDoText: toDoInput,
    dueDate: 'Sample dueDate',
    dateCreated: Date.now(),
  };
};

const addItemToList = (item, list) => {
  list.push(item);
  console.log({ list });
};

const saveToLocalStorage = (list) => {
  localStorage.setItem('list', JSON.stringify(list));
};

const getFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('list') || '[]');
};

const handleAdd = () => {
  //receive the data into obj
  const itemData = receiveItemData();
  console.log(itemData);

  //retrieve list from local storage
  const list = getFromLocalStorage();
  console.log({ list });

  //push obj to array
  addItemToList(itemData, list);

  //store array in local storage (stringify it first)
  saveToLocalStorage(list);
};

export { receiveItemData, addItemToList, getFromLocalStorage, handleAdd };
