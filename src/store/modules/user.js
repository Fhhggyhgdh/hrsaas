import { login } from '@/api/login'

export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await login(loginData) // 在响应拦截器中已经处理过后端返回来的结果了
      // console.log(data)
      commit('SET_TOKEN', data)
    }
  }
}
