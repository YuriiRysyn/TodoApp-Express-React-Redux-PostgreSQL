const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { addTodo, getTodos, deleteTodo } = require('./server/todos');
const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/todos', (req, res) => {
  res.send(getTodos());
});

app.post('/api/todos', bodyParser.json(), (req, res) => {
  const data = req.body;
  console.log(data);
  addTodo(data);
  const todos = getTodos();
  res.send(todos[todos.length - 1]);
});

app.delete('/api/todos/:todoId', (req, res) => {
  console.log(req.params.todoId);
  console.log(typeof(req.params.todoId));

  deleteTodo(req.params.todoId);


  res.json({ status: 'success' });
});

app.use(express.static('build'));
// app.use('/static', express.static(__dirname + '/public'));
// app.use('/static', express.static(path.join(__dirname, '/public')))
// app.use(express.static(path.join(__dirname, 'build')));
// app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
