import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "./assets/scss/style.scss";
import "./helpers/axiosConfig"

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store"
import * as serviceWorker from "./serviceWorker";

// fetch products from json file

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
