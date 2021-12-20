import React from 'react';
import ReactDOM from 'react-dom';

import { compose, applyMiddleware, createStore } from 'redux';

import thunk from 'redux-thunk';

import { Provider } from 'react-redux';

import { rootReducer } from './redux/reducer';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import App from './components/App';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
