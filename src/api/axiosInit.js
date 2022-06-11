import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://3.35.218.236/bbs'
});