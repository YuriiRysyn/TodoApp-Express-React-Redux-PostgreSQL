import { combineReducers } from 'redux';
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

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TODOS_FROM_LS:
      return [...action.todos];

    case GET_TODOS_FROM_SERVER:
      return [...action.todos];

    // case ADD_TODO:
    //   return [
    //     ...state,
    //     {
    //       title: action.title,
    //       id: action.id,
    //       completed: false,
    //     },
    //   ];

    case ADD_TODO:
      console.log(action);
      return [...state, action.newTodo];

    case TOGGLE_TODO:
      return [...state].map(todo => {
        if (todo.id === action.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      });

    case DELETE_TODO:
      return [...state].filter(todo => todo.id !== action.id);

    case CHANGE_TODO:
      return [...state].map(todo => {
        if (todo.id === action.id) {
          return {
            ...todo,
            title: action.title,
          };
        }

        return todo;
      });
    case MARK_ALL_TODOS:
      if (action.isAllToodosCompleted) {
        return [...state].map(todo => ({
          ...todo,
          completed: false,
        }));
      }

      return [...state].map(todo => ({
        ...todo,
        completed: true,
      }));

    case CLEAR_COMPLETED_TODOS:
      return [...state].filter(todo => !todo.completed);

    default:
      return state;
  }
};

const filterForTodos = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SHOW_ALL:
      return SHOW_ALL;

    case SHOW_COMPLETED:
      return SHOW_COMPLETED;

    case SHOW_ACTIVE:
      return SHOW_ACTIVE;

    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterForTodos,
});
