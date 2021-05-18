import { createRouter, createWebHashHistory } from 'vue-router';
import { user } from '@/service';
import store from '@/store';
import { message } from 'ant-design-vue';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),
  },
  {
    path: '/',
    name: 'BasicLayout',
    redirect: '/auth',
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
        path: 'house/:id',
        name: 'HouseDetails',
        component: () => import(/* webpackChunkName: "HouseDetails" */ '../views/HouseDetails/index.vue'),
      },
      {
        path: 'customer-list',
        name: 'CustomerList',
        component: () => import(/* webpackChunkName: "CustomerList" */  '@/views/Customer/index.vue')
      },
      {
        path: 'customer/:id',
        name: 'CustomerDetails',
        component: () => import(/* webpackChunkName: "CustomerDetails" */ '../views/CustomerDetails/index.vue'),
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
      {
        path: 'reset-password',
        name: 'ResetPassword',
        component: () => import(/* webpackChunkName: "ResetPassword" */  '@/views/ResetPassword/index.vue')
      },
      {
        path: 'invite-code',
        name: 'InviteCode',
        component: () => import(/* webpackChunkName: "InviteCode" */  '@/views/InviteCode/index.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "Profile" */  '@/views/Profile/index.vue')
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "Dashboard" */  '@/views/Dashboard/index.vue')
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach( async (to, from, next) => {
  let res = {};

  // 获取用户认证信息，没有认证就跳转到登录页面
  try {
    res = await user.info();
  } catch (e) {
    if (e.message.includes('code 401')) {
      res.code = 401;
    }
  }

  const { code } = res;

  if (code === 401) {
    if (to.path === '/auth') {
      next();
      return;
    }

    message.error('认证失败，请重新登入');
    next('/auth');

    return;
  }
  if(!store.state.characterInfo.length) {
    await store.dispatch('getCharacterInfo')
  }
  if(!store.state.userInfo.length) {
    await store.dispatch('getUserInfo')
  }

  if (to.path === '/auth') {
    next('/dashboard');
    return;
  }

  next()
})


export default router;
