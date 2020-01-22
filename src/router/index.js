import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Category = () => import('../views/category/Category.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Profile = () => import('../views/profile/Profile.vue')



// 1.安装插件
Vue.use(VueRouter)



// 2.创建router

const routes = [{
        path: '',
        redirect: '/home'
    }, {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/profile',
        component: Profile
    }
]

// 3.创建路由对象
const router = new VueRouter({
    mode: 'history',
    routes
  })
  
  // 4.导出
  export default router
  