<template>
  <div id="user-posts" class="container">
    <PostsDisplay />
  </div>
</template>

<script>
import PostsDisplay from "@/components/PostsDisplay";
import axios from "axios";

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
    const res = await axios.get('http://127.0.0.1:8000/post');
    this.posts = res.data;
  }
}
</script>

