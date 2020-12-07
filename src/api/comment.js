import request from '@/utils/request.js'

// 获取评论列表接口
export function getComment (params) {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

// 评论点赞
export function addCommentLike (target) {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 取消评论点赞
export function delCommentLike (target) {
  return request({
    method: 'DELETE',
    url: '/v1_0/comment/likings/' + target
  })
}

// 评论发布
export function addComment (data) {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
