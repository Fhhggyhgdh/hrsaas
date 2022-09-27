import { login } from '@/api/login'
import { getUserInfo, getUserDetailById } from '@/api/user'

export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    hrsaasTime: 0
  },

  mutations: {
    // 修改token
    SET_TOKEN(state, token) {
      state.token = token
    },
    // 修改用户信息
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    // 修改时间
    SET_HRSAASTIME(state, hrsaasTime) {
      state.hrsaasTime = hrsaasTime
    },
    // 移除用户信息
    REMOVE_USER_INFO(state) {
      state.userInfo = {}
    },
    // 移除token
    REMOVE_TOKEN(state) {
      state.token = null
    }
  },

  actions: {
    // 登录
    async loginAction({ commit }, loginData) {
      const data = await login(loginData) // 在响应拦截器中已经处理过后端返回来的结果了
      commit('SET_TOKEN', data)
      commit('SET_HRSAASTIME', +new Date())
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
      // 请求接口
      const res = await getUserInfo()
      const res1 = await getUserDetailById(res.userId)
      const result = { ...res, ...res1 }
      commit('SET_USER_INFO', result)
      return JSON.parse(JSON.stringify(result)) // 后面会用到
    },
    // 退出
    logout({ commit }) {
      commit('REMOVE_USER_INFO')
      commit('REMOVE_TOKEN')
    }
  }
}
