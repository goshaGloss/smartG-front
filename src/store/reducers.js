import {
    mainPageState,
    aboutPageState,
    catalogState
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
export const AboutPageReducer = (state = aboutPageState, {type, payload}) => {
    switch (type) {
        case actions.aboutPage:
            return {...state, contents: payload};
        
        default:
            return state;
    }
}
export const CatalogPageReducer = (state=catalogState,{type,payload}) => {
        switch (type) {
            case actions.PRODUCT_FETCH:
                const new_payload = {
                    ...payload,
                    products: {
                        data: [...payload.data]
                    }
                }
                return {...state, ...new_payload};
            default:
                return {...state}
        }
}

export const catalogFilterReducer = (state=catalogState,{type,payload}) => {
        switch (type) {
            case actions.filterCat:
                const new_payload = {
                    ...payload,
                }
                return {...state, ...new_payload};
            default:
                return {...state}
        }
}
export const catalogSubFilterReducer = (state=catalogState,{type,payload}) => {
        switch (type) {
            case actions.filterSubCat:
                const new_payload = {
                    ...payload,
                }
                return {...state, ...new_payload};
            default:
                return {...state}
        }
}