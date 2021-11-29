import {applyMiddleware, combineReducers, createStore} from "redux";
import {
    MainPageReducer,

} from "./reducers";
import thunk from 'redux-thunk';
const middleware = [thunk];

const reducers = combineReducers({

    mainPage: MainPageReducer,

});

export default createStore(reducers,(applyMiddleware(...middleware)));