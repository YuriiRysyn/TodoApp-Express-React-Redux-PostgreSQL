import React, { useContext, useState } from "react";
import PropTypes, { shape } from "prop-types";

import classNames from "classnames/bind";
import { connect, useDispatch, useSelector } from "react-redux";
import { changeTodo, toggleTodo, deleteTodo } from "../../redux/actions";

import CheckoutDrawerContext from "../context";

const TodoItem = ({
  // todos,
  todo,
  // changeTodo,
  // toggleTodo,
  // deleteTodo,
}) => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editTodo, setEditTodo] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);

  const value = useContext(CheckoutDrawerContext);

  const handleEditing = (event) => {
    if (event.key === "Enter") {
      if (todoTitle) {
        dispatch(changeTodo(todo.id, todoTitle.trim()));
      } else {
        dispatch(deleteTodo(todo.id));
      }

      setEditTodo(false);
    }

    if (event.key === "Escape") {
      setTodoTitle(todo.title);
      setEditTodo(false);
    }
  };

  const removefocus = (event) => {
    if (todoTitle) {
      dispatch(changeTodo(todo.id, todoTitle.trim()));
    } else {
      dispatch(deleteTodo(todo.id));
    }

    setEditTodo(false);
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: editTodo,
      })}
      onDoubleClick={() => setEditTodo(!editTodo)}
    >
      {!editTodo ? (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id, todos))}
          />
          <label>{todo.title}</label>
          <button
            type="button"
            className="destroy"
            onClick={() => dispatch(deleteTodo(todo.id))}
          />
        </div>
      ) : (
        <input
          type="text"
          className="edit"
          value={todoTitle}
          autoFocus
          onChange={event => setTodoTitle(event.target.value)}
          onKeyUp={handleEditing}
          onBlur={removefocus}
        />
      )}
    </li>
  );
};

TodoItem.propTypes = {
  // todos: PropTypes.arrayOf(
  //   shape({
  //     id: PropTypes.isRequired,
  //     completed: PropTypes.bool.isRequired,
  //   })
  // ).isRequired,
  todo: PropTypes.shape({
    id: PropTypes.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  // toggleTodo: PropTypes.func.isRequired,
  // deleteTodo: PropTypes.func.isRequired,
  // changeTodo: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   todos: state.todos,
// });

// export default connect(mapStateToProps, actions)(TodoItem);
export default TodoItem;
