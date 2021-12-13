import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from './Post';

import { fetchPosts } from '../redux/actions';
import { Loader } from './Loader';

export const FetchedPosts = () => {
  // const { posts } = useSelector(fetchedPstateosts => fetchedPosts);
  const fetchedPosts = useSelector(state => state.posts.fetchedPosts);
  const isLoading = useSelector(state => state.app.loading);

  const dispatch = useDispatch();

  const getPosts = () => {
    dispatch(fetchPosts());
  };

  // const { fetchedPosts } = posts;

  console.log(fetchedPosts);
  if (isLoading) return <Loader />;
  if (!fetchedPosts.length) {
    return (
      <button className="btn btn-primary" onClick={getPosts}>
        Get posts
      </button>
    );
  }

  return fetchedPosts.map(post => <Post post={post.title} key={post.id} />);
};
