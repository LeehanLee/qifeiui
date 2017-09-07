import axios from "axios";
import promise from 'es6-promise';
promise.polyfill();

const get = (url, config) => {
    return axios.get(url, config);
};

const post = (url, data, config) => {
    console.log("do some thing before post...");
    return axios.post(url, data, config);
};

const ApiHelper = {
    get, post
};
export default ApiHelper;