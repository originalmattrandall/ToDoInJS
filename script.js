document.addEventListener('DOMContentLoaded', (event) => {
    const addTaskButton = document.getElementById('addTaskButton');

    const itemsFromStorage = getFromLocalStorage();

    itemsFromStorage.forEach(item => {
        setupToDoItem(item.value);
    });

    addTaskButton.addEventListener('click', () => { addNewToDoTask(); }, false);
});

const addNewToDoTask = () => {
    const taskToDoInput = document.getElementById('taskToDo');

    if (!taskToDoInput || !taskToDoInput.value) return;

    setupToDoItem(taskToDoInput.value);

    const todoItems = convertToDoItemsToJsonString("todoItems");

    saveToLocalStorage(JSON.stringify(todoItems));
}

const setupToDoItem = (value) => {
    const li = createNewLiElement(value);
    addItemToList("todoItems", li);

    const deleteButton = createDeleteButton(li);
    deleteButton.addEventListener('click', () => {
        removeItemFromList("todoItems", li);
    }, false);
}

const addItemToList = (listId, liElement) => {
    if (!listId || !liElement) return;

    const ul = document.getElementById(listId);
    ul.appendChild(liElement);
}

const removeItemFromList = (listId, liToRemove) => {
    if (!listId || !liToRemove) return;

    const ul = document.getElementById(listId);
    ul.removeChild(liToRemove);

    const todoItems = convertToDoItemsToJsonString("todoItems");
    saveToLocalStorage(JSON.stringify(todoItems));
}

const createNewLiElement = (value) => {
    const newLi = document.createElement("li");
    newLi.setAttribute('id', value);

    newLi.appendChild(document.createTextNode(value));

    return newLi;
}

const createDeleteButton = (li) => {
    const deleteButton = document.createElement("INPUT");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("Value", "Delete");
    deleteButton.setAttribute("id", li.id);

    li.appendChild(deleteButton);

    return deleteButton;
}

const convertToDoItemsToJsonString = (listId) => {
    if (!listId) return;

    const ul = document.getElementById(listId);

    let list = [];

    const todoItems = ul.childNodes;

    todoItems.forEach(element => {
        if(!element.id || !element.textContent) return; 

        const item = {
            "key": element.id,
            "value": element.textContent
        };

        list.push(item);
    });

    return list;
}

const saveToLocalStorage = (value) => {
    window.localStorage.setItem("todo-items", value);
}

const getFromLocalStorage = () => {
    return JSON.parse(window.localStorage.getItem("todo-items"));
}