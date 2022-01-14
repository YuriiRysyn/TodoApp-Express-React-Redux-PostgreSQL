import React, { useState  } from 'react';
import PropTypes, { shape } from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';
// import * as actions from '../../redux/actions';
import { addTodo } from '../../redux/actions';

const AddTodos = () => {
  const dispatch = useDispatch();
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const addNewTodo = (event) => {
    event.preventDefault();

    if (newTodoTitle.trim() === '') {
      return;
    } 
    
    dispatch(addTodo(newTodoTitle));

    setNewTodoTitle('');
  };

  return (
    <form onSubmit={event => addNewTodo(event)}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodoTitle}
        onChange={({ target }) => setNewTodoTitle(target.value)}
      />
    </form>
  );
};

// AddTodos.propTypes = {
//   todos: PropTypes.arrayOf(shape({
//     id: PropTypes.isRequired,
//     completed: PropTypes.bool.isRequired,
//   })).isRequired,
//   addTodo: PropTypes.func.isRequired,
// };

// const mapStateToProps = state => ({
//   todos: state.todos,
// });

// export default connect(mapStateToProps, ({ addTodo }))(AddTodos);
// export default connect(mapStateToProps, actions)(AddTodos);

export default AddTodos;
