import axios from 'axios';
//qs处理post请求请求参数为FromData的情况
import qs from 'qs';
import 'element-ui/lib/theme-chalk/index.css';
import { Loading ,Message } from 'element-ui';

axios.defaults.timeout = 15000;

let loadingInstance;
//http request 拦截器(请求前的拦截)
axios.interceptors.request.use((config) => {
        loadingInstance  = Loading.service({ //加载loading
            fullscreen: true, 
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)' 
        });
        config.data = config.data;
        config.headers = {
            "Content-type": "application/json; charset=utf-8",
        }
        return config;
    },
    error => {
        loadingInstance.close();//关闭loading
        return Promise.reject(error);
    }
);


//http response 拦截器(请求成功的统一处理)
axios.interceptors.response.use(response => {
        loadingInstance.close();//关闭loading
        if(response.data.code != 200){
                Message({
                    message: response.data.message,
                    type: 'error'
                });
        }
        return response;
    },
    error => {
        loadingInstance.close();//关闭loading
        return Promise.reject(error)
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
    return new Promise((resolve,reject) => {
        axios.get(url,{
                params:params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.post(url,JSON.stringify(data))
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}
