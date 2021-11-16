<template>
    <PostsDisplay :posts="posts" :static-url="staticUrl" />
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
    const res = await axios.get('http://127.0.0.1:8000/post/user/' + this.$route.params.id);
    this.posts = res.data;
  }
}
</script>

