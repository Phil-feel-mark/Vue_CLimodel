import request from '../utils/request.js'

export function login (data) {
  return request({
    method: 'post',
    url: '/v1_0/authorizations',
    data
  })
}
// 获取验证码
export function sendSms (data) {
  return request({
    method: 'GET',
    url: '/v1_0/sms/codes/' + data
  })
}

// 获取用户信息
export function getUserInfo () {
  return request({
    method: 'get',
    url: '/v1_0/user'
  })
}

// 获取频道信息
export function getchannels () {
  return request({
    method: 'get',
    url: '/v1_0/user/channels'
  })
}

// 关注用户
export function addFollow (target) {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

// 取消关注
export function delFollow (target) {
  return request({
    method: 'DELETE',
    url: '/v1_0/user/followings/' + target
  })
}

/**
 * 获取用户个人资料
 */
// 获取指定用户信息
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

/**
 * 更新昵称
 */
export const updateUserName = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

/**
 * 更新性别
 */
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

/**
 * 更新生日
 */
export const updateUserBirthdat = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

/**
 * 更新生日
 */
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
