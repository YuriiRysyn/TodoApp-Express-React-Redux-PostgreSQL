import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addPost } from '../redux/actions';

export const PostForm = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();

    if(!title.trim()) return;

    const newPost = {
      title,
      id: Date.now().toLocaleString(),
    };

    dispatch(addPost(newPost));
    // console.log(newPost);
    setTitle('');
  };

  const changeInputHandler = e => {
    // this.setState(prevState => ({
    //   ...prevState,
    //   ...{ [e.target.name]: e.target.value },
    // }));
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group ">
        <label htmlFor="title">Post title</label>
        <input
          type="text"
          className="form-control "
          id="title"
          value={title}
          onChange={changeInputHandler}
          name={'title'}
        />
      </div>
      <button className="btn btn-success mt-2" type="submit">
        Create
      </button>
    </form>
  );
};
