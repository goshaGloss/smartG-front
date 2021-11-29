import {actions} from "./constants";
import api from "../helpers/api";

export const mainPageAction = () => async (dispatch) => {
    try{
        const res = await api._getMainPage();
        dispatch({
            type: actions.MainPage,
            payload: res.data
        });

        return Promise.resolve(res.data);
    }
    catch (err){
        return Promise.reject(err);
    }
}