<template>
  <PostsDisplay :posts="posts" :static-url="staticUrl" />
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import PostsDisplay from "@/components/PostsDisplay";

export default {
  name: "Home",
  components: {PostsDisplay},
  data() {
    return {
      posts: [],
      staticUrl: '/post/'
    }
  },
  async created() {
    const res = await axios.get('http://127.0.0.1:8000/post');
    console.log(res.data);
    this.posts = res.data;
  },
  mounted() {

  },
};
</script>


