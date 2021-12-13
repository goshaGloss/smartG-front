import axios from "axios";
import {_url, _storage} from "./helper";

axios.defaults.headers.common['content-language'] = 'ru';

class API {
    constructor() {
        this._setCustomUrl = function (url) {
            return _url + url;
        }
    }
    _getMainPage() {
        return axios.get(this._setCustomUrl('api/pages/index'));
    }
    _getDeliveryPage() {
        return axios.get(this._setCustomUrl('api/pages/delievery'));
    }
    _getBrandPage() {
        return axios.get(this._setCustomUrl('api/pages/brand'));
    }
    _getAboutPage() {
        return axios.get(this._setCustomUrl('api/pages/about'));
    }
    _getWholePage() {
        return axios.get(this._setCustomUrl('api/pages/whosales'));
    }
    _getPartnersPage() {
        return axios.get(this._setCustomUrl('api/pages/partner'));
    }
    _getServicePage() {
        return axios.get(this._setCustomUrl('api/pages/service'));
    }
    _fetchProducts(id) {
        return axios.get(this._setCustomUrl(`api/catalog/products?page=${id}`));
    }
    _filterCategory(id, page) {
        // alert();
        return axios.get(this._setCustomUrl(`api/catalog/category/${id}?page=${page}`));
    }
    _filterSubCategory(id,page) {
        // alert();
        return axios.get(this._setCustomUrl(`api/catalog/subcategory/${id}?page=${page}`));
    }
    _fetchProduct(id){
        return axios.get(this._setCustomUrl(`api/catalog/product/${id}`))
    }
    _postUser(form){
        return axios.post(this._setCustomUrl(`api/auth/register`),form)
    }
    _login(form){
        return axios.post(this._setCustomUrl(`api/auth/login`),form)
    }
    _resetPass(form){
        return axios.post(this._setCustomUrl(`api/auth/reset`),form)
    }
    _confirmCode(form){
        return axios.post(this._setCustomUrl(`api/auth/confirm`),form)
    }
    _setNewPass(form){
        return axios.post(this._setCustomUrl(`api/auth/password_update`),form)
    }
    _getUser(form){
        if(_storage.get('smartg-token')){
            return axios.get(this._setCustomUrl('api/profile/user'),{
            headers: {
                Authorization: 'Bearer ' + _storage.get('smartg-token')
            }
        })
        }
        // return axios.get(this._setCustomUrl('api/profile/user'))
    }
    _postAvatar(form){
            if(_storage.get('smartg-token')) return axios.post(this._setCustomUrl('api/profile/change-avatar'),form,{
            headers: {
                Authorization: 'Bearer ' + _storage.get('smartg-token')
            }
        })
    }
    _updateUser(form){
        if(_storage.get('smartg-token')) return axios.post(this._setCustomUrl('api/profile/change'),form,{
            headers: {
                Authorization: 'Bearer ' + _storage.get('smartg-token')
            }
        })
    }
    _setFav(form){
        if(_storage.get('smartg-token')) return axios.post(this._setCustomUrl('api/addtofavourite'),form,{
            headers: {
                Authorization: 'Bearer ' + _storage.get('smartg-token')
            }
        })
    }
    _showFav(form){
        if(_storage.get('smartg-token')) return axios.get(this._setCustomUrl('api/showfavourites'),{
            headers: {
                Authorization: 'Bearer ' + _storage.get('smartg-token')
            }
        })
    }
    _deleteFav(form){
        console.log(form)
        if(_storage.get('smartg-token')) return axios.post(this._setCustomUrl('api/deletefromfavourites'),form,{
            headers: {
                Authorization: 'Bearer ' + _storage.get('smartg-token')
            }
        })
    }
    _postOrder(form){
        if(_storage.get('smartg-token')) return axios.post(this._setCustomUrl('api/cart/order'),form,{
            headers: {
                Authorization: 'Bearer ' + _storage.get('smartg-token')
            }
        })
    }
    _postComment(form,id){
        if(_storage.get('smartg-token')) return axios.post(this._setCustomUrl(`api/profile/product/${id}/review`),form,{
            headers: {
                Authorization: 'Bearer ' + _storage.get('smartg-token')
            }
        })
    }
}
const _api = new API();

export default _api;