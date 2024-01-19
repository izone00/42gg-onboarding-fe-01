// 로컬 스토리지
const todoPrefix = 'todo:';
const storage = {
  createTodoItem: (content) => {
    const id = (randomNumber = Math.floor(Math.random() * 10000));
    const todoItem = {
      id,
      content: content,
      completed: false,
    };
    localStorage.setItem(todoPrefix + id, JSON.stringify(todoItem));
    return todoItem;
  },
  updateTodoItem: (item) => {
    localStorage.setItem(todoPrefix + item.id, JSON.stringify(item));
    return item;
  },
  getTodoItemById: (id) => {
    return JSON.parse(localStorage.getItem(todoPrefix + id));
  },
  getTodoItemList: () => {
    const todoListKeys = [];
    for (let key in localStorage) {
      if (key.startsWith(todoPrefix)) todoListKeys.push(key);
    }
    const todoItems = todoListKeys.map((key) =>
      JSON.parse(localStorage.getItem(key))
    );
    return todoItems;
  },
  removeTodoItem: (id) => {
    localStorage.removeItem(todoPrefix + id);
  },
};

const todoListUl = document.getElementById('todo-list');
todoListUl.createTodoElemLi = function (todoItem) {
  let isUpdating = false;

  const todoCheckbox = document.createElement('input');
  todoCheckbox.classList.add('todo-comlete-checkbox');
  todoCheckbox.type = 'checkbox';
  todoCheckbox.checked = todoItem.completed ? true : false;
  todoCheckbox.addEventListener('click', handleCheckbox);

  const todoContent = document.createElement('p');
  todoContent.classList.add('todo-content');
  todoItem.completed && todoContent.classList.add('completed');
  todoContent.innerText = todoItem.content;

  const todoUpdateButton = document.createElement('button');
  todoUpdateButton.classList.add('todo-update-button');
  todoUpdateButton.innerText = '수정';
  todoUpdateButton.addEventListener('click', handleUpdateButton);

  const todoDeleteButton = document.createElement('button');
  todoDeleteButton.classList.add('todo-delete-button');
  todoDeleteButton.innerText = '삭제';
  todoDeleteButton.addEventListener('click', handleDeleteButton);

  const todoSaveButton = document.createElement('button');
  todoSaveButton.classList.add('todo-delete-button');
  todoSaveButton.innerText = '저장';
  todoSaveButton.addEventListener('click', handleSaveButton);

  const todoCancelButton = document.createElement('button');
  todoCancelButton.classList.add('todo-delete-button');
  todoCancelButton.innerText = '취소';
  todoCancelButton.addEventListener('click', handleCancelButton);

  const todoElemLi = document.createElement('li');
  function render() {
    todoElemLi.replaceChildren(
      todoCheckbox,
      todoContent,
      isUpdating ? todoSaveButton : todoUpdateButton,
      isUpdating ? todoCancelButton : todoDeleteButton
    );
  }

  function handleCheckbox(e) {
    const isChecked = e.target.checked;
    todoItem.completed = isChecked;
    storage.updateTodoItem(todoItem);
    todoItem.completed
      ? todoContent.classList.add('completed')
      : todoContent.classList.remove('completed');
  }
  function handleUpdateButton() {
    isUpdating = true;
    todoContent.contentEditable = true;
    render();
    todoContent.focus();
  }
  function handleSaveButton() {
    isUpdating = false;
    todoItem.content = todoContent.innerText;
    storage.updateTodoItem(todoItem);
    todoContent.contentEditable = false;
    render();
  }
  function handleDeleteButton() {
    isUpdating = false;
    storage.removeTodoItem(todoItem.id);
    todoElemLi.remove();
    render();
  }
  function handleCancelButton() {
    isUpdating = false;
    todoContent.innerText = todoItem.content;
    todoContent.contentEditable = false;
    render();
  }

  render();
  todoListUl.prepend(todoElemLi);
};

storage.getTodoItemList().map((item) => todoListUl.createTodoElemLi(item));

const todoCreateTextarea = document.querySelector('#todo-create textarea');
document.getElementById('todo-create').addEventListener('submit', (e) => {
  e.preventDefault();

  const todoItem = storage.createTodoItem(todoCreateTextarea.value);
  todoListUl.createTodoElemLi(todoItem);
  todoCreateTextarea.value = '';
});
