import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Signup from "@/views/Signup";
import CreatePost from "@/views/CreatePost";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/createpost',
    name: 'createpost',
    component: CreatePost
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
