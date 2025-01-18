import { type RouteRecordRaw } from "vue-router";

const  route: readonly RouteRecordRaw[] = [
  {
    path: '/customer',
    name: 'customer',
    component: () => import('@/modules/customer/views/CustomerView.vue')
  }
]

export default route;
