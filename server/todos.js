const { v4: uuidv4 } = require('uuid');

let todos = [
  { id: '1', completed: true, title: 'HsTML' },
  { id: '2', completed: false, title: 'CSS' },
  { id: '3', completed: true, title: 'JS' },
];

const getTodos = () => todos;

const addTodo = data => {
  // const id =
  //   todos.length === 0
  //     ? 1
  //     : todos.reduce(
  //         (accum, currentTodo) =>
  //           accum > +currentTodo.id ? accum : +currentTodo.id,
  //         0
  //       ) + 1;

  const newTodo = {
    id: uuidv4(),
    completed: false,
    title: data.title,
  };

  todos = [...todos, newTodo];
};

const changeTodo = data => {
  const changedTodos = [todos].map(todo => {
    if (todo.id === data.id) {
      return {
        ...todo,
        title: data.title,
        completed: !todo.completed,
      };
    }

    return todo;
  });

  todos = changedTodos;
};

const deleteTodo = todoId => {
  console.log(todoId);

  const filteredTodos = todos.filter(todo => todo.id !== todoId);

  console.log(filteredTodos);

  todos = filteredTodos;
};

module.exports = {
  getTodos,
  addTodo,
  changeTodo,
  deleteTodo,
};
