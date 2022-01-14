const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {
  addTodo,
  getTodos,
  deleteTodo,
  updateTodo,
  markAllTodos,
  clearCompletedTodos,
} = require('./server/todos');
const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/todos', (req, res) => {
  res.send(getTodos());
});

app.post('/api/todos', bodyParser.json(), (req, res) => {
  const newTodo = req.body;
  addTodo(newTodo);
  const todos = getTodos();
  res.send(todos[todos.length - 1]);
});


app.delete('/api/todos/:todoId', (req, res) => {
  deleteTodo(req.params.todoId);

  res.json({ status: 'success' });
});



app.patch('/api/todos/update/:todoId', bodyParser.json(), (req, res) => {
  updateTodo(req.params.todoId, req.body);

  res.json({ status: 'success' });
});

app.patch('/api/todos/mark-all-todos', bodyParser.json(), (req, res) => {
  console.log(req.body);
  markAllTodos(req.body.isAllToodosCompleted);

  res.json({ status: 'success' });
});


app.delete('/api/delete-completed-todos', (req, res) => {
  console.log('delete');
  clearCompletedTodos();

  res.json({ status: 'success' });
});

app.use(express.static('build'));

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});
 