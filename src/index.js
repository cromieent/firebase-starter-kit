import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainForm from './components/memberform/MainForm'
import store from './components/store/memberInfo';
import { Provider } from 'react-redux';


ReactDOM.render(<Provider store={store}>
    <MainForm />
</Provider>,
    document.getElementById('root')
);