import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store'
import { character } from '@/service'

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),
  },
  {
    path: '/',
    name: 'BasicLayout',
    component: () => import(/* webpackChunkName: "BasicLayout" */ '../layout/BasicLayout/index.vue'),
    children: [
      {
        path: 'books',
        name: 'Books',
        component: () => import(/* webpackChunkName: "Book" */ '../views/Books/index.vue'),
      },
      {
        path: 'books/:id',
        name: 'BookDetails',
        component: () => import(/* webpackChunkName: "BookDetails" */ '../views/BookDetails/index.vue'),
      },
      {
        path: 'house-list',
        name: 'HouseList',
        component: () => import(/* webpackChunkName: "HouseList" */  '@/views/House/index.vue')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "User" */  '@/views/User/index.vue')
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import(/* webpackChunkName: "Log" */  '@/views/Log/index.vue')
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach( async (to, from, next) => {
  if(!window.characterInfo) {
    const res = await character.list()
    window.characterInfo = res.data
    store.dispatch('getCharacterInfo')
  }
  next()
})


export default router;
