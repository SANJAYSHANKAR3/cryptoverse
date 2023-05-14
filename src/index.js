import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import Homepage from './components/Homepage'
import { BrowserRouter as Router } from 'react-router-dom';
ReactDom.render(
      
<Router>
        <App /> 
     
</Router>
,document.getElementById('root'));