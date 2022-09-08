import {
  ADD_TODO,
  SHOW_ACTIVE,
  SHOW_ALL,
  SHOW_COMPLETED,
  TOGGLE_TODO,
  DELETE_TODO,
  CHANGE_TODO,
  MARK_ALL_TODOS,
  CLEAR_COMPLETED_TODOS,
  GET_TODOS_FROM_LS,
  GET_TODOS_FROM_SERVER,
} from './constants';

import { v4 as uuidv4 } from 'uuid';

export const getTodosFromLS = () => dispatch => {
  if (JSON.parse(localStorage.getItem('todos'))) {
    const todos = JSON.parse(localStorage.getItem('todos'));

    dispatch({
      type: GET_TODOS_FROM_LS,
      todos,
    });
  }
};

export const getTodosFromServer = () => dispatch => {
  try {
    (async function () {
      const url = process.env.REACT_APP_API_URL + '/todos';
      const res = await fetch(url);
      const todos = await res.json();
      dispatch({
        type: GET_TODOS_FROM_SERVER,
        todos,
      });
    })();
  } catch (e) {
    console.log(e);
  }
};

const addLocalTodo = newTodo => ({
  type: ADD_TODO,
  newTodo,
});

export const addTodo = title => dispatch => {
  try {
    const newTodo = {
      id: uuidv4(),
      completed: false,
      title,
    };

    (async function () {
      const url = process.env.REACT_APP_API_URL + '/todos';

      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(newTodo),
      });

      dispatch(addLocalTodo(newTodo));
    })();
  } catch (e) {
    console.log(e);
  }
};

const deleteLocalTodo = id => ({
  type: DELETE_TODO,
  id,
});

export const deleteTodo = todoId => dispatch => {
  try {
    (async function () {
      const url = `${process.env.REACT_APP_API_URL}/todos/${todoId}`;

      await fetch(url, {
        method: 'DELETE',
      });

      dispatch(deleteLocalTodo(todoId));
    })();
  } catch (e) {
    console.log(e);
  }
};

export const toggleLocalTodo = id => ({
  type: TOGGLE_TODO,
  id,
});

export const toggleTodo = todoId => dispatch => {
  try {
    (async function () {
      const url = `${process.env.REACT_APP_API_URL}/todos/update/${todoId}`;

      await fetch(url, {
        method: 'PATCH',
      });

      dispatch(toggleLocalTodo(todoId));
    })();
  } catch (e) {
    console.log(e);
  }
};

export const changeLocalTodo = (todoId, title) => ({
  type: CHANGE_TODO,
  id: todoId,
  title,
});

export const changeTodo = (todoId, title) => dispatch => {
  try {
    (async function () {
      const url = `${process.env.REACT_APP_API_URL}/todos/update/${todoId}`;

      await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          title,
        }),
      });

      dispatch(changeLocalTodo(todoId, title));
    })();
  } catch (e) {
    console.log(e);
  }
};

export const markAllTodosLocal = isAllToodosCompleted => ({
  type: MARK_ALL_TODOS,
  isAllToodosCompleted,
});

export const markAllTodos = isAllToodosCompleted => dispatch => {
  try {
    (async function () {
      const url = `${process.env.REACT_APP_API_URL}/todos/mark-all-todos/`;

      await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          isAllToodosCompleted,
        }),
      });

      dispatch(markAllTodosLocal(isAllToodosCompleted));
    })();
  } catch (e) {
    console.log(e);
  }
};

export const clearCompletedTodosLocal = () => ({
  type: CLEAR_COMPLETED_TODOS,
});

export const clearCompletedTodos = () => dispatch => {
  try {
    (async function () {
      const url = `${process.env.REACT_APP_API_URL}/delete-completed-todos/`;

      await fetch(url, {
        method: 'DELETE',
      });

      dispatch(clearCompletedTodosLocal());
    })();
  } catch (e) {
    console.log(e);
  }
};

export const showAllTodos = () => ({ type: SHOW_ALL });
export const showCompletedTodos = () => ({ type: SHOW_COMPLETED });
export const showActiveTodos = () => ({ type: SHOW_ACTIVE });
