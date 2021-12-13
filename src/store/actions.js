import {actions} from "./constants";
import api from "../helpers/api";
import {_storage} from "../helpers/helper";

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
export const brandPageAction = () => async (dispatch) => {
    try{
        const res = await api._getBrandPage();

        return Promise.resolve(res.data);
    }
    catch (err){
        return Promise.reject(err);
    }
}
export const deliveryPageAction = () => async (dispatch) => {
    try{
        const res = await api._getDeliveryPage();

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
export const filterByCat = (id, page) => async (dispatch) => {
    try{
        // console.log(id)
        const res = await api._filterCategory(id, page);
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
export const filterBySubCat = (id, page) => async (dispatch) => {
    try{
        const res = await api._filterSubCategory(id, page);
        console.log(res)
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
export const wholePageAction = () => async (dispatch) => {
    try{
        const res = await api._getWholePage();

        return Promise.resolve(res.data);
    }
    catch (err){
        return Promise.reject(err);
    }
}
export const partnersPageAction = () => async (dispatch) => {
    try{
        const res = await api._getPartnersPage();

        return Promise.resolve(res.data);
    }
    catch (err){
        return Promise.reject(err);
    }
}
export const servicePageAction = () => async (dispatch) => {
    try{
        const res = await api._getServicePage();

        return Promise.resolve(res.data);
    }
    catch (err){
        return Promise.reject(err);
    }
}
export const registerAction = (user) => async (dispatch) => {
    try{
        const res = await api._postUser(user);

        // console.log(res.data.token)
        dispatch({
            type: actions.REGISTER_ACTION,
            payload: res.data
        })
        return Promise.resolve(res.data);
    }
    catch (err){
        return Promise.reject(err);
    }
}
export const authAction = (user) => async (dispatch) => {
    try{
        const res = await api._login(user);
        console.log(res)
        // console.log(res.data.token)
        // dispatch({
        //     type: actions.GET_USER,
        //     payload: res.data
        // })
        dispatch({
            type: actions.AUTHED,
            payload: true
        })
        _storage.set('smartg-token', res.data.token)
        return Promise.resolve(res.data);
    }
    catch (err){
        return Promise.reject(err);
    }
}
export const resetAction = (user) => async (dispatch) => {
    try{
        const res = await api._resetPass(user);

        return Promise.resolve(res.data);
    }
    catch (err){
        return Promise.reject(err);
    }
}
export const confirmAction = (user) => async (dispatch) => {
    try{
        const res = await api._confirmCode(user);
        
        return Promise.resolve(res.data);
    }
    catch (err){
        return Promise.reject(err);
    }
}
export const newPassAction = (user) => async (dispatch) => {
    try{
        // console.log(user)
        const res = await api._setNewPass(user);
        
        return Promise.resolve(res.data);
    }
    catch (err){
        return Promise.reject(err);
    }
}
export const getUserAction = () => async (dispatch) => {
    try {
        const res = await api._getUser();
        dispatch({
            type: actions.GET_USER,
            payload: res.data
        });

        return Promise.resolve(res.data);

    } catch (err) {
        return Promise.reject(err);
    }
}
export const avatarAction = (avatar) => async (dispatch) => {
    try {
        const res = await api._postAvatar(avatar);

        // dispatch({
        //     type: actions.GET_USER,
        //     payload: res.data
        // });

        return Promise.resolve(res);

    } catch (err) {
        return Promise.reject(err);
    }
}
export const updateUserAction = (user) => async (dispatch) => {
    try {
        const res = await api._updateUser(user);

        dispatch({
            type: actions.USER_ACTION,
            payload: res.data
        });

        return Promise.resolve(res.data);

    } catch (err) {
        return Promise.reject(err);
    }
}
export const setFavAction = (item) => async (dispatch) => {
    try {
        const res = await api._setFav(item);
        console.log(res)

        return Promise.resolve(res.data);

    } catch (err) {
        return Promise.reject(err);
    }
}
export const getFavAction = (item) => async (dispatch) => {
    try {
        const res = await api._showFav(item);
        dispatch({
            type: actions.getFavs,
            payload: res.data.favourites
        });
        return Promise.resolve(res.data);

    } catch (err) {
        return Promise.reject(err);
    }
}
export const removeFavAction = (item) => async (dispatch) => {
    try {
        console.log(item)
        const res = await api._deleteFav(item);
        dispatch({
            type: actions.getFavs,
            payload: res.data.favourites
        });
        return Promise.resolve(res.data);

    } catch (err) {
        return Promise.reject(err);
    }
}
export const logoutUserAction = () => async (dispatch) => {
    try{
        dispatch({
            type: actions.AUTHED,
            payload: false
        });

        _storage.remove('smartg-token');

        return Promise.resolve(false);
    }
    catch (err){
        return Promise.reject(err);
    }
}
export const postOrderAction = (order) => async(dispatch) => {
    try{
        const res = await api._postOrder(order)

        console.log(res)
        return Promise.resolve(res.data)
    }
    catch(err){
        return Promise.reject(err)
    }
}

export const postCommentAction = (comment, id) => async(dispatch) => {
    try{
        const res = await api._postComment(comment,id)

        console.log(res)
        return Promise.resolve(res.data)
    }
    catch(err){
        return Promise.reject(err)
    }
}