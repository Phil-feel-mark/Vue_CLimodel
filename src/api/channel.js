import request from '../utils/request.js'

// 获取所有频道列表
export function getChannelList () {
  return request({
    method: 'get',
    url: '/v1_0/channels'

  })
}

// 数据持久化 线上保存添加频道
export function AddChannelItem (channel) {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: [channel]
  })
}

// 数据持久化 线上删除频道
export function delChannlesItem (id) {
  return request({
    method: 'DELETE',
    url: '/v1_0/user/channels/' + id

  })
}
