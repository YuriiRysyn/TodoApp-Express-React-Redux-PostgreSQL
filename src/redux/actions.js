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
} from './constants';

export const getTodosFromLS = () => (dispatch) => {
  let todos;

  if (JSON.parse(localStorage.getItem('todos'))) {
    todos = (JSON.parse(localStorage.getItem('todos')));

    dispatch({
      type: GET_TODOS_FROM_LS,
      todos,
    });
  }
};

export const addTodo = (title, id) => ({
  type: ADD_TODO,
  id,
  title,
});

// export const addTodo = (title, id) => dispatch => (
//   setTimeout(() => dispatch({
//     type: ADD_TODO,
//     id,
//     title,
//   }), 500)
// );

export const deleteTodo = id => ({
  type: DELETE_TODO,
  id,
});

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
