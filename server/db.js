const { Client } = require('pg');
// const pg = require('pg');
const fs = require('fs');

const postgresqlUri =
  'postgres://avnadmin:AVNS_QFvdROutROabxYw@pg-31dc23d6-lostxakep-0315.aivencloud.com:18476/defaultdb?sslmode=require';

const conn = new URL(postgresqlUri);
conn.search = conn.query = '';

// const credentials = {
//   user: 'avnadmin',
//   host: 'pg-31dc23d6-lostxakep-0315.aivencloud.com',
//   database: 'defaultdb',
//   password: 'AVNS_QFvdROutROabxYw',
//   port: 18476,
// };

const config = {
  connectionString: conn.href,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync('./ca.pem').toString(),
  },
};
const client = new Client(config);
client.connect();

const getAllTodosFromDB = async () => {
  try {
    const todos = await client.query('SELECT * FROM todos');
    console.log(todos.rows); // Todo

    return await todos.rows;
  } catch (e) {
    console.log(e);
  }
};

const addTodoToDB = async newTodo => {
  try {
    await client.query(
      `INSERT INTO todos 
       VALUES (${newTodo.completed}, '${newTodo.title}', '${newTodo.id}');`
    );
  } catch (e) {
    console.log(e);
  }
};

const deleteCompletedTodosFromDB = async () => {
  try {
    await client.query('DELETE FROM todos WHERE completed=true;');
  } catch (e) {
    console.log(e);
  }
};

const deleteTodoFromDB = async todoId => {
  try {
    await client.query(`DELETE FROM todos WHERE id='${todoId}';`);
  } catch (e) {
    console.log(e);
  }
};

const updateTodoInDB = async (todoId, data) => {
  try {
    const query = await client.query(
      `SELECT * FROM todos 
      WHERE id='${todoId}';`
    );
    const currentTodo = query.rows[0];

    console.log(currentTodo);

    if (data.title) {
      await client.query(
        `UPDATE todos 
        SET title='${data.title} '
        WHERE id='${todoId}';`
      );
    } else {
      await client.query(
        `UPDATE todos SET completed=${!currentTodo.completed} WHERE id='${todoId}';`
      );
    }

  } catch (e) {
    console.log(e);
  }
};

const markAllTodosInDB = async isAllToodosCompleted => {
  try {
    await client.query(
      `UPDATE todos SET completed=${!isAllToodosCompleted};`
    );
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllTodosFromDB,
  addTodoToDB,
  deleteCompletedTodosFromDB,
  deleteTodoFromDB,
  updateTodoInDB,
  markAllTodosInDB,
};
