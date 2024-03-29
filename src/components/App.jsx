import React, { useEffect, useMemo, useState } from 'react';
import { connect, useSelector, shallowEqual, useDispatch } from 'react-redux';
import PropTypes, { shape } from 'prop-types';

import { TodoList } from './TodoList/TodoList';
import AddTodos from './AddTodos/AddTodos';
import TodosFilter from './TodosFilter/TodosFilter';

import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from '../redux/constants';

import * as actions from '../redux/actions';
import * as userActions from '../redux/actions/userActions';

import CheckoutDrawerContext from './context';

const App = () => {
  const [unCompletedTodos, setUnCompletedTodos] = useState('');
  const [completedTodos, setCompletedTodos] = useState('');
  const [isAllToodosCompleted, setIsAllToodosCompleted] = useState(false);
  const [isPending, setIsPending] = useState(true);

  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const todos = useSelector(state => state.todos);
  const todosFilter = useSelector(state => state.filter);

  const filterTodosByCompleteStatus = () => {
    if (todosFilter === SHOW_COMPLETED) {
      return todos.filter(todo => todo.completed);
    }

    if (todosFilter === SHOW_ACTIVE) {
      return todos.filter(todo => !todo.completed);
    }

    return todos;
  };

  const filteredTodos = filterTodosByCompleteStatus();

  useEffect(() => {
    // dispatch(actions.getTodosFromLS());
    dispatch(userActions.getUser());
    setIsPending(false);
  }, []);

  useEffect(() => {
    // dispatch(actions.getTodosFromLS());
    setIsPending(true);

    dispatch(actions.getTodosFromServer());
    setIsPending(false);
  }, []);

  useEffect(() => {
    // dispatch(actions.getTodosFromServer());

    setUnCompletedTodos(() => todos.filter(todo => !todo.completed));
    setCompletedTodos(() => todos.filter(todo => todo.completed));

    setIsAllToodosCompleted(() => todos.every(item => item.completed === true));

    // localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <AddTodos />
      </header>
      {todos.length !== 0 ? (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              checked={isAllToodosCompleted}
              onChange={() =>
                dispatch(actions.markAllTodos(isAllToodosCompleted))
              }
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <CheckoutDrawerContext.Provider value="sddsds">
              <TodoList filteredTodos={filteredTodos} />
            </CheckoutDrawerContext.Provider>
          </section>

          <footer className="footer">
            <span className="todo-count">
              {unCompletedTodos.length}
              {unCompletedTodos.length === 1 ? ' item ' : ' items '}
              left
            </span>

            <TodosFilter />
            {completedTodos.length > 0 ? (
              <button
                type="button"
                className="clear-completed"
                onClick={() => dispatch(actions.clearCompletedTodos())}
              >
                Clear completed
              </button>
            ) : (
              ''
            )}
          </footer>
        </>
      ) : (
        ''
      )}
    </section>
  );
};

export default App;
