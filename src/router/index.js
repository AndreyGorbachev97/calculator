import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/list-nir',
  },
  {
    path: '/list-nir/edit/:id',
    name: 'EditNirPage',
    component: () => import('../components/pages/EditNirPage.vue'),
  },
  {
    path: '/list-nir',
    name: 'ListNirPage',
    component: () => import('../components/pages/ListNirPage.vue'),
  },
  {
    path: '/list-okr',
    name: 'ListOkrPage',
    component: () => import('../components/pages/ListOkrPage.vue'),
  },
  {
    path: '/nir-innovation-properties',
    name: 'DirectoryNirPage',
    component: () => import('../components/pages/NirInnovationPropertiesPage.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
