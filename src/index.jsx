import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';
import App from './App.jsx';
import {BrowserRouter,HashRouter} from 'react-router-dom'

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>), document.getElementById('root'));