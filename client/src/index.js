import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css'
import {Provider} from 'react-redux'
import { applyMiddleware , createStore} from 'redux';
import promisMiddleware from 'redux-promise';
import Reducer from './_reducer/index'
import ReduxThunk from 'redux-thunk'
const createStoreWithMiddleware = applyMiddleware(promisMiddleware,ReduxThunk)(createStore);
ReactDOM.render(
  <React.StrictMode>
    <Provider store ={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
