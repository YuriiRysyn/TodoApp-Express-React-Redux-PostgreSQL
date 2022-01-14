let todos = [
  { id: '1', completed: true, title: 'HsTML' },
  { id: '2', completed: false, title: 'CSS' },
  { id: '3', completed: true, title: 'JS' },
];

const getTodos = () => todos;

const addTodo = newTodo => {
  todos = [...todos, newTodo];
};

const deleteTodo = todoId => {
  todos = todos.filter(todo => todo.id !== todoId);
};

const updateTodo = (todoId, data) => {
  todos = todos.map(todo => {
    if (todo.id === todoId) {
      if (data.title) {
        return {
          ...todo,
          title: data.title,
        };
      } else
        return {
          ...todo,
          completed: !todo.completed,
        };
    }

    return todo;
  });
};

const markAllTodos = isAllToodosCompleted => {
  todos = todos.map(todo => ({
    ...todo,
    completed: !isAllToodosCompleted,
  }));
};

const clearCompletedTodos = () => {
  todos = todos.filter(todo => todo.completed !== true);

  console.log(todos);
};

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  markAllTodos,
  clearCompletedTodos,
};
