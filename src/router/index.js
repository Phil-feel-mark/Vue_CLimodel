import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/index'

Vue.use(VueRouter)

const routes = [
  // 默认跳转到登录页面
  // { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('../views/login/login.vue') }, // 路由懒加载 component
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/index')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/index')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/index')
      }
    ]
  }, // 路由懒加载 component
  { path: '/search', component: () => import('../views/seacher/index.vue') },
  // props 开启路由参数传参  将路由的Id映射到组件
  { path: '/article/:articleId', props: true, name: 'article', component: () => import('../views/Article/index.vue') },
  { path: '/user/profile', name: 'UserProfile', component: () => import('../views/user-info/useredit.vue') }
]

const router = new VueRouter({
  routes
})

export default router
