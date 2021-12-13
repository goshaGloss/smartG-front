import {applyMiddleware, combineReducers, createStore} from "redux";
import {
    MainPageReducer,
    AboutPageReducer,
    CatalogPageReducer,
    catalogFilterReducer,
    catalogSubFilterReducer,
    userReducer,
    AuthReducer,
    favsReducer

} from "./reducers";
import thunk from 'redux-thunk';
const middleware = [thunk];

const reducers = combineReducers({
    userInfo: userReducer,
    mainPage: MainPageReducer,
    catalog: CatalogPageReducer,
    catalog: catalogFilterReducer,
    catalog: catalogSubFilterReducer,
    aboutPage: AboutPageReducer,
    isAuthed: AuthReducer,
    favs: favsReducer
});

export default createStore(reducers,(applyMiddleware(...middleware)));