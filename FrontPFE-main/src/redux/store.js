import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { load, save } from "redux-localstorage-simple";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

const store = createStore(
    rootReducer,
    load(),
    composeWithDevTools(applyMiddleware(thunk, save()))
);
export default store;