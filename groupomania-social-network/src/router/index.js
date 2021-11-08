import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Signup from '@/views/Signup'
import CreatePost from '@/views/CreatePost'
import Post from '@/views/Post'
import UserPosts from "@/views/UserPosts";

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
  },
  {
    path: '/post/:id',
    name: 'post',
    component: Post
  },
  {
    path: '/post/user/:id',
    name: 'userposts',
    component: UserPosts
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
