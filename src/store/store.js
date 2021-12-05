import {applyMiddleware, combineReducers, createStore} from "redux";
import {
    MainPageReducer,
    AboutPageReducer,
    CatalogPageReducer,
    catalogFilterReducer,
    catalogSubFilterReducer

} from "./reducers";
import thunk from 'redux-thunk';
const middleware = [thunk];

const reducers = combineReducers({

    mainPage: MainPageReducer,
    catalog: CatalogPageReducer,
    catalog: catalogFilterReducer,
    catalog: catalogSubFilterReducer,
    aboutPage: AboutPageReducer
});

export default createStore(reducers,(applyMiddleware(...middleware)));