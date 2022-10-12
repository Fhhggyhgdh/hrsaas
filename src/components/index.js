import * as filters from '@/filters/index'

const fn = require.context('./', true, /\.vue$/)

const components = fn.keys().map(ele => {
  return fn(ele)
})

export default {
  install(Vue) {
    // 注册全局组件
    components.forEach(ele => {
      Vue.component(ele.default.name, ele.default)
    })

    // 注册全局过滤器
    Object.keys(filters).forEach(key => {
      Vue.filter(key, filters[key])
    })
  }
}
