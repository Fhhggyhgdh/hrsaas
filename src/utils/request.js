
import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址
  timeout: 5000
})

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
    Message.error(error.message)// 提示错误消息
    // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
    return Promise.reject(error)
  }
)
export default service
