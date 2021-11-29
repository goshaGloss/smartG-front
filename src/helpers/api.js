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
}
const _api = new API();

export default _api;