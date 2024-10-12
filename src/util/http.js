import axios from "axios"
import {store} from "../redux/store"
import {addMessage} from "./message"

axios.defaults.baseURL =
  "https://netease-cloud-music-6g6muoojt-wangwanlin-97.vercel.app/"

// axios.defaults.baseURL = "https://wansherry.com/music-api"

axios.defaults.withCredentials = true
//使用axios拦截器

//请求拦截器
axios.interceptors.request.use(
  config => {
    //发送请求之前做某些事

    store.dispatch({type: "sidebar/settrue"})

    return config
  },
  err => {
    //请求错误时做某事

    addMessage({message: "Request Error" + err, duration: 4000})
    return Promise.reject(err)
  },
)
//响应拦截器
axios.interceptors.response.use(
  response => {
    //对响应数据做某些事
    // setfalse()
    store.dispatch({type: "sidebar/setfalse"})
    return response
  },
  err => {
    if (err.response && err.response.data) {
      if (String(err.response.status).startsWith("4"))
        addMessage({
          type: "error",
          message: err.response.status + "  " + err.response.data.message,
          duration: 3000,
        })
    }
    return Promise.reject(err)
  },
)
