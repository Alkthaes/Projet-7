<template>
    <PostsDisplay :posts="posts" :static-url="staticUrl" />
</template>

<script>
import PostsDisplay from "@/components/PostsDisplay";
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

export default {
  name: "UserPosts",
  components: {PostsDisplay},
  data() {
    return {
      posts: [],
      staticUrl: '/post/',
    }
  },
  async created() {
    if (this.$store.state.isLoggedIn == false) {
      await this.$router.push({path: '/'})
    }

    const res = await axios.get('/posts/user/' + this.$route.params.id);
    this.posts = res.data.posts;
  }
}
</script>

