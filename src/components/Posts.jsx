import React from 'react';
import { useSelector } from 'react-redux';
import { Post } from './Post';

export const Posts = () => {
  const { posts } = useSelector(posts => posts);
  const syncPosts = posts.posts;

  console.log(posts);

  if (!syncPosts.length) {
    return <p className="text-center">have no posts, yet</p>;
  }
  return syncPosts.map(post => <Post post={post.title} key={post.id} />);
};
