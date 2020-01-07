import Vue from 'vue';
import VueRouter from 'vue-router';
import TableView from '../views/TableView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'table',
    component: TableView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
