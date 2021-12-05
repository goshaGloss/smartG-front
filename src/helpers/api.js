import axios from "axios";
import {_url} from "./helper";

axios.defaults.headers.common['content-language'] = 'ru';

class API {
    constructor() {
        this._setCustomUrl = function (url) {
            return _url + url;
        }
    }
    _getMainPage() {
        return axios.get(this._setCustomUrl('api/index'));
    }
    _getAboutPage() {
        return axios.get(this._setCustomUrl('api/about'));
    }
    _fetchProducts(id) {
        return axios.get(this._setCustomUrl(`api/products?page=${id}`));
    }
    _filterCategory(id) {
        // alert();
        return axios.get(this._setCustomUrl(`api/category/${id}`));
    }
    _filterSubCategory(id) {
        // alert();
        return axios.get(this._setCustomUrl(`api/subcategory/${id}`));
    }
    _fetchProduct(id){
        return axios.get(this._setCustomUrl(`api/product/${id}`))
    }
}
const _api = new API();

export default _api;