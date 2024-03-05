import { createRouter, createWebHistory } from 'vue-router'
// import { createRouter } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
// import Statistics from '@/views/StatisticsView.vue'
import LoginLayout from '@/components/LoginLayout.vue';
import MainLayout from '@/components/MainLayout.vue';
import { useUserStore } from '@/stores/userStore';

// Create a new router history instance
const routerHistory = createWebHistory();

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  // history: createMemoryHistory(),
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
          // component: Statistics
          component: () => import('@/views/StatisticsView.vue')
        },
        // Other routes for your application
        {
          path: 'billingRevenue',
          name: 'BillingRevenue',
          component: () => import('@/views/departments/BillingRevenueView.vue')
        },
        {
          path: 'distribution',
          name: 'Distribution',
          component: () => import('@/views/departments/DistributionView.vue')
        },
        {
          path: 'marketing',
          name: 'Marketing',
          component: () => import('@/views/departments/MarketingView.vue')
        },
        {
          path: 'onboarding',
          name: 'Onboarding',
          component: () => import('@/views/departments/OnboardingView.vue')
        },
        {
          path: 'product',
          name: 'Product',
          component: () => import('@/views/departments/ProductView.vue')
        },
        {
          path: 'sales',
          name: 'Sales',
          component: () => import('@/views/departments/SalesView.vue')
        },
        {
          path: 'support',
          name: 'Support',
          component: () => import('@/views/departments/SupportView.vue')
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

router.beforeEach(async (to, from) => {

  const userStore = useUserStore();
  const isAuthenticated = userStore.isAuthenticated;
  if (!isAuthenticated && to.name !== 'Login') {
    return { name: 'Login' }
  }
});

export default router
