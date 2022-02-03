import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import { PersistGate } from "redux-persist/integration/react";
import { persistedStore } from "./store";
import CircularProgress from '@mui/material/CircularProgress';


ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate loading={<CircularProgress />} persistor={persistedStore}> */}
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById('root')
);


