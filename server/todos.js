const {
  getAllTodosFromDB,
  addTodoToDB,
  deleteCompletedTodosFromDB,
  deleteTodoFromDB,
  updateTodoInDB,
  markAllTodosInDB
} = require('./db.js');

// let todos = [
//   { id: '1', completed: true, title: 'HsTML' },
//   { id: '2', completed: false, title: 'CSS' },
//   { id: '3', completed: true, title: 'JS' },
// ];

const getTodos = () => getAllTodosFromDB();

const addTodo = newTodo => {
  addTodoToDB(newTodo);
  // todos = [...todos, newTodo];
};

const deleteTodo = todoId => {
  // todos = todos.filter(todo => todo.id !== todoId);
  deleteTodoFromDB(todoId);
};

const updateTodo = (todoId, data) => {
  updateTodoInDB(todoId, data);
  // todos = todos.map(todo => {
  //   if (todo.id === todoId) {
  //     if (data.title) {
  //       return {
  //         ...todo,
  //         title: data.title,
  //       };
  //     } else
  //       return {
  //         ...todo,
  //         completed: !todo.completed,
  //       };
  //   }

  //   return todo;
  // });
};

const markAllTodos = isAllToodosCompleted => {
  // todos = todos.map(todo => ({
  //   ...todo,
  //   completed: !isAllToodosCompleted,
  // }));
  markAllTodosInDB(isAllToodosCompleted)
};

const clearCompletedTodos = () => {
  // todos = todos.filter(todo => todo.completed !== true);
  deleteCompletedTodosFromDB();
};

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  markAllTodos,
  clearCompletedTodos,
};
