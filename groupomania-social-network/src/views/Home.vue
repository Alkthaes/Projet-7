<template>
  <PostsDisplay :posts="posts" :staticUrl="staticUrl" />
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import PostsDisplay from "@/components/PostsDisplay";

axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

export default {
  name: "Home",
  components: {PostsDisplay},
  data() {
    return {
      posts: null,
      staticUrl: '/post/',
      user: null
    }
  },
  async created() {
    if (this.$store.state.isLoggedIn == false) {
      await this.$router.push({path: '/'})
    }
    const res = await axios.get('/posts');
    this.posts = res.data.posts;
    console.log(this.posts);
  },
};
</script>


