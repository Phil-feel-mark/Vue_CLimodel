import request from '@/utils/request.js'

// 获取联想列表
export function suggestionLost (q) {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 获取结果列表

export const ResultList = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
