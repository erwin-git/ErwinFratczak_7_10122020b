import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import Users from '../views/Users.vue'
import Profil from '../components/Profil.vue';
import DeleteProfil from '../components/DeleteProfil.vue';
import OnePost from '../components/OnePost.vue';



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/post',
    name: 'Post',
    component: Post
  },
  {
    path: '/auth/',
    name: 'Users',
    component: Users
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/profil/:id',
    name: 'Profil',
    component: Profil,
  },
  {
    path: '/profil/:id',
    name: 'DeleteProfil',
    component: DeleteProfil,
  },
  {
    path: '/post/:id',
    name: 'OnePost',
    component: OnePost,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
