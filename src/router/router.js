import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',//登录页
      name: 'login',
      component: () => import('@/views/login')
    },
    {
      path: '/index',
      name: 'index',
      component: resolve => { require(['@/views/index'], resolve) },
      redirect: '/index/systemIndex',
      children: [
        {
          path: '/index/systemIndex', //系统首页
          name: 'systemIndex',
          component: resolve => { require(['@/views/index/systemIndex'], resolve) }
        },
        {
          path: '/index/accountSetting', //账户设置页
          name: 'saccountSetting',
          component: resolve => { require(['@/views/index/accountSetting'], resolve) }
        },
        {
          path: '/index/systemInfo', //系统信息
          name: 'systemInfo',
          component: resolve => { require(['@/views/index/systemInfo'], resolve) }
        },
        {
          path: '/goods/list', //商品列表
          name: 'goodsList',
          component: resolve => { require(['@/views/goods/list'], resolve) }
        },
        {
          path: '/goods/add', //添加商品
          name: 'add',
          component: resolve => { require(['@/views/goods/add'], resolve) }
        },
        {
          path: '/order/list', //订单列表
          name: 'list',
          component: resolve => { require(['@/views/order/list'], resolve) }
        },
        {
          path: '/promotion/header', //头部列表
          name: 'header',
          component: resolve => { require(['@/views/promotion/header'], resolve) }
        },
        {
          path: '/stock/in', //商品入库
          name: 'stockIn',
          component: resolve => { require(['@/views/stock/in'], resolve) }
        },
        {
          path: '/user/list', //用户列表
          name: 'userList',
          component: resolve => { require(['@/views/user/list'], resolve) }
        },
        {
          path: '/operate/advertising', //广告列表
          name: 'advertising',
          component: resolve => { require(['@/views/operate/advertising'], resolve) }
        },
        {
          path: '/statistics/deal', //交易统计
          name: 'deal',
          component: resolve => { require(['@/views/statistics/deal'], resolve) }
        },
        {
          path: '/authority/authority', //区域设置
          name: 'authority',
          component: resolve => { require(['@/views//authority/authority'], resolve) }
        }
      ]
    }
  ]
})
