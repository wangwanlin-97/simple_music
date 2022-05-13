import axios from "axios";
import { store } from "../redux/store";


axios.defaults.baseURL = 'https://netease-cloud-music-6g6muoojt-wangwanlin-97.vercel.app/'
axios.defaults.withCredentials = true
//使用axios拦截器

//请求拦截器
axios.interceptors.request.use(config => {
    //发送请求之前做某些事

    store.dispatch({ type: 'sidebar/settrue' })

    return config
}, err => {
    //请求错误时做某事
    return Promise.reject(err)
})
//响应拦截器
axios.interceptors.response.use(response => {
    //对响应数据做某些事
    // setfalse()
    store.dispatch({ type: 'sidebar/setfalse' })
    return response
}, err => {
    return Promise.reject(err)
})