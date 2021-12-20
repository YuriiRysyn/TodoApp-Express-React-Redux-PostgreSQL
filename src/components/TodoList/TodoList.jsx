import React from "react";
import { connect } from "react-redux";
import PropTypes, { shape } from "prop-types";

import TodoItem from "./TodoItem";
import * as actions from "../../redux/actions";

export const TodoList = ({ filteredTodos }) => {
  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  filteredTodos: PropTypes.arrayOf(
    shape({
      id: PropTypes.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default TodoList;
