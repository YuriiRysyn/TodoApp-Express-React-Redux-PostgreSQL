const {
  getAllTodosFromDB,
  addTodoToDB,
  deleteCompletedTodosFromDB,
  deleteTodoFromDB,
  updateTodoInDB,
  markAllTodosInDB,
} = require('./db.js');

// const isActiveDB = process.env.IS_ACTIVE_DB;
const isActiveDB = process.env.IS_ACTIVE_DB;

let todos = [
  { id: '1', completed: true, title: 'HsTML' },
  { id: '2', completed: false, title: 'CSS' },
  { id: '3', completed: true, title: 'JS' },
];

const getTodos = () => (isActiveDB ? getAllTodosFromDB() : todos);

const addTodo = newTodo => {
  isActiveDB ? addTodoToDB(newTodo) : (todos = [...todos, newTodo]);
};

const deleteTodo = todoId => {
  isActiveDB
    ? deleteTodoFromDB(todoId)
    : (todos = todos.filter(todo => todo.id !== todoId));
};

const updateTodo = (todoId, data) => {
  isActiveDB
    ? updateTodoInDB(todoId, data)
    : (todos = todos.map(todo => {
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
      }));
};

const markAllTodos = isAllToodosCompleted => {
  isActiveDB
    ? markAllTodosInDB(isAllToodosCompleted)
    : (todos = todos.map(todo => ({
        ...todo,
        completed: !isAllToodosCompleted,
      })));
};

const clearCompletedTodos = () => {
  isActiveDB
    ? deleteCompletedTodosFromDB()
    : (todos = todos.filter(todo => todo.completed !== true));
};

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  markAllTodos,
  clearCompletedTodos,
};
