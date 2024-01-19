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
  const todoContent = document.createElement('p');
  todoContent.classList.add('todo-content');
  todoItem.completed && todoContent.classList.add('completed');
  todoContent.innerText = todoItem.content;

  const todoElemLi = document.createElement('li');
  function render() {
    todoElemLi.replaceChildren(
      todoContent,
    );
  }

  render();
  todoListUl.prepend(todoElemLi);
};

storage.getTodoItemList().map((item) => todoListUl.createTodoElemLi(item));

