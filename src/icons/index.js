import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
// console.log(req.keys()) 所有图片的路径
// console.log(req('./dashboard.svg')) 这张图片的模块

// 把所有模块加载进来
const requireAll = requireContext => requireContext.keys().map((val) => {
  return requireContext(val)
})

requireAll(req)
