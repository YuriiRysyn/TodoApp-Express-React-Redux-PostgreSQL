import { CREATE_POST, FETCH_POST } from './constants';

const initialState = {
  posts: [],
  fetchedPosts: [],
};

export const postsReducer = (state = initialState, action) => {
  if (action.type === CREATE_POST) {
    return {
      ...state,
      // posts: [...state.posts, { title: action.title, id: action.id }],
      posts: [...state.posts, action.payload],
    };
  }

  if(action.type === FETCH_POST) {
    return {
      ...state,
      // posts: [...state.posts, { title: action.title, id: action.id }],
      fetchedPosts: action.payload,
    };
  }

  return state;
};
