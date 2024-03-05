import axios from 'axios';
import { RESPONSE_STATUS, LOCAL_STORAGE_AUTH } from '@/utils/constants';
import { localStorageHelper } from '@/utils/helper';

class DefaultService {
    api;
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}`,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,

        });
        this.api.interceptors.response.use(this.handleResponse, this.handleError);
    }

    handleResponse = (response) => {
        return response.data;
    }

    handleError = (error) => {
        if (RESPONSE_STATUS.FAIL.indexOf(error?.response?.status) > -1) {
            localStorageHelper.remove(LOCAL_STORAGE_AUTH);
            const evt = new CustomEvent('rollbackRoute', {
                detail: '/auth/boxed-signin',
            });
            window.dispatchEvent(evt);
        }
        return Promise.reject(error);
    }

    getExport = (url = '', params = {}) => {
        return this.api.get(url, { params });
    }

    postFile = (url = '', body = {}) => {
        return this.api.post(url, body);
    }

    get = (url = '', params = {}) => {
        return this.api.get(url, { params });
    }

    post = (url = '', body = {}, config = {}) => {
        return this.api.post(url, body, config);
    }

    patch = (url = '', body = {}, config = {}) => {
        return this.api.patch(url, body, config);
    }

    put = (url = '', body = {}, config = {}) => {
        return this.api.put(url, body, config);
    }

    delete = (url = '', config = {}) => {
        return this.api.delete(url, config);
    }
}

export default new DefaultService()
