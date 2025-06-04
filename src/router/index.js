  import { createRouter, createWebHistory } from 'vue-router'
  import HomeView from '@/views/HomeView.vue'
  import CategoryView from '@/views/CategoryView.vue'
  import ProductDetailView from '@/views/ProductDetailView.vue'
  import CartView from '@/views/CartView.vue'

  const routes = [
    { path: '/',                name: 'home',            component: HomeView },
    { path: '/category/:slug',  name: 'category',        component: CategoryView, props: true },
    {
      path: '/product/:id',
      name: 'product-detail',    // nome da rota
      component: ProductDetailView,
      props: true                // permite passar "id" como prop
    },
    { path: '/cart',            name: 'cart',            component: CartView }
  ]

  export default createRouter({
    history: createWebHistory(),
    routes
  })
