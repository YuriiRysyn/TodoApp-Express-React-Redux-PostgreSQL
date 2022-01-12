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

// export const addTodo = (title, id) => ({
//   type: ADD_TODO,
//   id,
//   title,
// });

export const addTodo = title => dispatch => {
  try {
    (async function () {
      const url = process.env.REACT_APP_API_URL + '/todos';
      const res = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ title }),
      });

      dispatch(getTodosFromServer());
    })();
  } catch (e) {
    console.log(e);
  }
};

// export const deleteTodo = id => ({
//   type: DELETE_TODO,
//   id,
// });

export const deleteTodo =  todoId => dispatch => {
  try {
    (async function () {
      const url = `${process.env.REACT_APP_API_URL}/todos/${todoId}`;
      const res = await fetch(url, {
        method: 'delete',
      });

      dispatch(getTodosFromServer());
    })();
  } catch (e) {
    console.log(e);
  }
};

export const toggleTodo = (id, todos) => ({
  type: TOGGLE_TODO,
  id,
  todos,
});

export const markAllTodos = isAllToodosCompleted => ({
  type: MARK_ALL_TODOS,
  isAllToodosCompleted,
});

export const changeTodo = (id, title) => ({
  type: CHANGE_TODO,
  id,
  title,
});

export const clearCompletedTodos = () => ({
  type: CLEAR_COMPLETED_TODOS,
});

export const showAllTodos = () => ({ type: SHOW_ALL });
export const showCompletedTodos = () => ({ type: SHOW_COMPLETED });
export const showActiveTodos = () => ({ type: SHOW_ACTIVE });
