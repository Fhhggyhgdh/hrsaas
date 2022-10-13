import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

export const getUserDetailById = (id) => request({
  url: `/sys/user/${id}`,
  method: 'get'
})

/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
