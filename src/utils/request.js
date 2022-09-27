import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

const TimeOut = 3600
// 对比时间是否超时
const isCheckTimeout = () => {
  const currentTime = Date.now()
  const timeStamp = (currentTime - store.getters.hrsaasTime) / 1000
  return timeStamp > TimeOut
}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      if (isCheckTimeout()) {
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('token超时'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // axios默认加了一层data
    const { message, data, success } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
      // 业务逻辑成功的时候执行
      return data
    } else {
      // 业务逻辑错误的时候执行
      Message.error(message) // 提示错误消息
      // 抛出错误
      return Promise.reject(new Error(message))
    }
  },
  error => {
    // console.log(error)
    // 当token不完整或者被修改后，退出登录，跳转到登陆页面
    if (error.response && error.response.status === 401) {
      store.dispatch('user/logout')
      router.push('/login')
      Message.error('token超时')
    } else {
      Message.error(error.message)// 提示错误消息
    }
    // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
    return Promise.reject(error)
  }
)
export default service
