import {
    mainPageState,
} from "./states";
import {actions} from "./constants";
export const MainPageReducer = (state = mainPageState, {type, payload}) => {
    switch (type) {
        case actions.MainPage:
            return {...state, contents: payload};
        
        default:
            return state;
    }
}