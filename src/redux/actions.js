import { CREATE_POST, FETCH_POST, HIDE_LOADER, SHOW_LOADER } from './constants';

export const addPost = newPostData => ({
  type: CREATE_POST,
  payload: newPostData,
});

export const fetchPosts = () => {
  return async dispatch => {
    dispatch({ type: SHOW_LOADER });

    const responce = await fetch(
      'https://jsonplaceholder.typicode.com/posts?_limit=5'
    );
    const json = await responce.json();
    dispatch({ type: FETCH_POST, payload: json });
    dispatch({ type: HIDE_LOADER });
  };
};
