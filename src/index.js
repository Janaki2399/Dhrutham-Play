import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router}from "react-router-dom";
import { DataProvider } from './contexts/data-context';
import setupMockServer from "./api/mock.server";
setupMockServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <DataProvider>
     <App />
    </DataProvider>
    </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);
