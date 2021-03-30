import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {setLogin} from "./Component/reducers/login-reducer";
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from "redux-thunk";


const allReducers = combineReducers({
    singIn: setLogin,
    form: formReducer
})

let store = createStore(allReducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

reportWebVitals();
