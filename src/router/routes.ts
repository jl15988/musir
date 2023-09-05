import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/Home.vue'),
    meta: {
      title: '首页',
      icon: 'House'
    }
  },
  {
    path: '/myMusic',
    component: () => import('@/components/MainContainer.vue'),
    meta: {
      title: '我的音乐'
    },
    children: [{
      path: 'favorite',
      component: () => import('@/views/Favorite/Favorite.vue'),
      meta: {
        title: '收藏',
        icon: 'Star'
      }
    }, {
      path: 'local',
      component: () => import('@/views/Local/Local.vue'),
      meta: {
        title: '本地',
        icon: 'Monitor'
      }
    }, {
      path: 'lately',
      component: () => import('@/views/Lately/Lately.vue'),
      meta: {
        title: '最近',
        icon: 'Clock'
      }
    }, {
      path: 'list',
      component: () => import('@/views/List/List.vue'),
      meta: {
        title: '列表',
        icon: 'Tickets'
      }
    }]
  },
  {
    path: '/mySheet',
    component: () => import('@/components/MainContainer.vue'),
    meta: {
      title: '我的歌单'
    },
    children: []
  }
]

export default routes
