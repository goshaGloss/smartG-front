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

export const fetchProducts = (id = 1) => async (dispatch) =>{
    try{
        const res = await api._fetchProducts(id);
        dispatch({
            type: actions.PRODUCT_FETCH,
            payload: res.data
        });
        return Promise.resolve(res.data);
    }
    catch (err){
        return Promise.reject(err);
    }
}
export const fetchProduct = (id) => async (dispatch) =>{
    try{
        const res = await api._fetchProduct(id);
        dispatch({
            type: actions.PRODUCT_FETCH,
            payload: res.data
        });
        return Promise.resolve(res.data);
    }
    catch (err){
        return Promise.reject(err);
    }
}
export const filterByCat = (id) => async (dispatch) => {
    try{
        const res = await api._filterCategory(id);
        dispatch({
            type: actions.filterCat,
            payload: res.data.Category.products
        });
        return Promise.resolve(res.data.Category.products);
    }
    catch (err){
        return Promise.reject(err);
    }
}
export const filterBySubCat = (id) => async (dispatch) => {
    try{
        const res = await api._filterSubCategory(id);
        dispatch({
            type: actions.filterSubCat,
            payload: res.data.Subcategory.products
        });
        return Promise.resolve(res.data.Subcategory.products);
    }
    catch (err){
        return Promise.reject(err);
    }
}
export const aboutPageAction = () => async (dispatch) => {
    try{
        const res = await api._getAboutPage();
        dispatch({
            type: actions.aboutPage,
            payload: res.data
        });

        return Promise.resolve(res.data);
    }
    catch (err){
        return Promise.reject(err);
    }
}