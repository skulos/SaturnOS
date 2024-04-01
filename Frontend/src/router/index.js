import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import NewBillView from '../views/pages/NewBillView.vue'
import BillsView from '@/views/pages/BillsView.vue'
import LoginLayout from '@/components/layouts/LoginLayout.vue';
import MainLayout from '@/components/layouts/MainLayout.vue';
import { useUserStore } from '@/stores/userStore';

// Create a new router history instance
const routerHistory = createWebHistory(import.meta.env.BASE_URL);

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/login',
      component: LoginLayout,
      children: [
        {
          path: '',
          name: 'Login',
          component: LoginView
        }
      ]
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: HomeView
        },
        {
          path: 'statistics',
          name: 'Statistics',
          component: () => import('@/views/pages/StatisticsView.vue')
        },
        {
          path: 'accounts',
          name: 'Accounts',
          component: () => import('@/views/pages/AccountsView.vue')
        },
        {
          path: 'bank',
          name: 'Bank',
          component: () => import('@/views/pages/BankView.vue')
        },
        {
          path: 'bills',
          name: 'Bills',
          component: BillsView,
          // children: [
          //   {
          //     path: 'new',
          //     name: 'NewBill',
          //     component: NewBillView
          //   },
          //   // Add other bill-related routes if needed
          // ]
        },
        {
          path: 'bills/new',
          name: 'NewBill',
          component: NewBillView
        },
        {
          path: 'payments',
          name: 'Payments',
          component: () => import('@/views/pages/PaymentsView.vue')
        },
        {
          path: 'barcodes',
          name: 'Barcodes',
          component: () => import('@/views/pages/BarcodesView.vue')
        },
        {
          path: 'reports',
          name: 'Reports',
          component: () => import('@/views/pages/ReportsView.vue')
        },
        {
          path: 'statistics',
          name: 'Statistics',
          component: () => import('@/views/pages/StatisticsView.vue')
        },
        {
          path: 'customers',
          name: 'Customers',
          component: () => import('@/views/pages/CustomersView.vue')
        },
        {
          path: 'suppliers',
          name: 'Suppliers',
          component: () => import('@/views/pages/SuppliersView.vue')
        },
        {
          path: 'product',
          name: 'Products',
          component: () => import('@/views/pages/ProductsView.vue')
        },
        {
          path: 'stockcontrol',
          name: 'Stock Control',
          component: () => import('@/views/pages/StockControlView.vue')
        },
        {
          path: 'sales',
          name: 'Sales',
          component: () => import('@/views/pages/SalesView.vue')
        },
        {
          path: 'bills/:id',
          name: 'Bill',
          component: () => import('@/views/pages/BillView.vue')
        },
      ]
    }
  ]
})


// Navigation guard to check if the user is authenticated before accessing routes
// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore();
//   const isAuthenticated = userStore.isAuthenticated;
//   if (to.path !== '/login' && !isAuthenticated) {
//     next('/login');
//   } else {
//     next();
//   }
// });

router.beforeEach(async (to, ) => {

  const userStore = useUserStore();
  const isAuthenticated = userStore.isAuthenticated;
  if (!isAuthenticated && to.name !== 'Login') {
    return { name: 'Login' }
  }
});

export default router
