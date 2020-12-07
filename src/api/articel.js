import request from '../utils/request.js'

// 获取新闻频道信息
export function getArticle (data) {
  return request({
    method: 'get',
    url: '/v1_1/articles',
    params: data
  })
}

// 获取页面详情信息
export function getArticleById (id) {
  return request({
    method: 'get',
    url: '/v1_0/articles/' + id
  })
}

// 收藏文章
export function addCollect (target) {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 取消收藏文章
export function delCollect (id) {
  return request({
    method: 'DELETE',
    url: '/v1_0/article/collections/' + id
  })
}

// 点赞
export function addLike (target) {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}

// 取消点赞
export function delLike (id) {
  return request({
    method: 'DELETE',
    url: '/v1_0/article/likings/' + id
  })
}
