import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux";
/*import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'*/
/*import rootReducer from "./reducers";*/
import { configureStore } from '@reduxjs/toolkit'

import menuReducer from "./reducers/menuReducer";

// 위에서 만든 reducer를 스토어 만들때 넣어줍니다
/*const store = createStore(rootReducer, composeWithDevTools());*/
const store = configureStore({
    reducer: {
        menu: menuReducer,
    },
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
