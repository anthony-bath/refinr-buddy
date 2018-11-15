import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';

import { Routes } from './routes';
import { config } from './config/firebase.config';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }
}

export default App;
