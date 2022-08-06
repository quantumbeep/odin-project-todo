let toDoList = [];

//editFn
const editToDo = () => {
  //change the value of 'toDoText' property in toDoItem
};

//delFn

const receiveItemData = (toDoText, dueDate) => {
  return {
    toDoText: "toDoText",
    dueDate: "dueDate",
    dateCreated: Date.now(),
    // editBtn: createBtn('EDIT', editFn),
    // deleteBtn: createBtn('DEL', delFn),
  };
};

const addItemToList = () => {
  const newToDoItem = receiveItemData('sample text', 'sample date');
  toDoList.push(newToDoItem);
  console.log({toDoList});
};

export { receiveItemData, addItemToList, toDoList };
