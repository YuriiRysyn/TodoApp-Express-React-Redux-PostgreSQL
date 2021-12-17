import React, { useEffect, useState } from 'react';

import './App.css';
import { FetchedPosts } from './components/FetchedPosts';
import { Posts } from './components/Posts';
import { PostForm } from './components/PostForm';

function App() {
  const question = {
    activeQuestion: 'asdas',
  };

  const [data, setData] = useState(null);

  const API_URL = '/api';

  useEffect(() => {
    (async function () {
      const res = await fetch(API_URL);
      const data = await res.json();

      console.log(data);
      setData(data);
    })();
  }, []);

  // delete question.activeQuestion;
  // delete question.enam
  // delete question.sadsa
  // delete question.dasdasda

  console.log(delete question.activeQuestion);

  console.log(delete question.dasdasda);

  return (
    <div className="container pt-3">
      <div className="row">
        <div className="col">
          <PostForm />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>Synchronous posts</h2>
          <Posts />
        </div>
        <div className="col">
          <h2>Asynchronous posts</h2>

          <FetchedPosts />
        </div>
      </div>
    </div>
  );
}

export default App;
