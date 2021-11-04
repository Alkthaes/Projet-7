<template>
  <div id="Home" class="container d-flex justify-content-center">
    <ul class="p-0 mt-5">
      <li v-for="post in posts" class="card mb-5" style="max-width: 900px" :key="post.id">
        <div class="card-header d-flex justify-content-between">
          <h2 class="fs-2">{{ post.titre }}</h2>
          <p>posté par:
            <img class="rounded-circle" :src="post.user.picture" alt="" width="30">
            {{ post.user.firstname }}</p>
        </div>

        <img :src="post.image" alt="" class="card-img-top"/>

        <div class="card-footer d-flex justify-content-around">
          <div class="d-flex">
            <button type="button" class="btn btn-outline-secondary rounded mx-3">
            <i class="fas fa-chevron-up"></i>
            </button>

            <button type="button" class="btn btn-outline-secondary rounded mx-3">
            <i class="fas fa-chevron-down"></i>
            </button>
          </div>


            <a :href="staticUrl + post.id" class="btn btn-outline-secondary rounded">
            <i class="fas fa-comment-alt"></i>
              <span class="ms-2 fw-bold fs-5">{{ post.comments.length }}</span>
            </a>

        </div>

      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: "Home",
  data() {
    return {
      posts: [],
      staticUrl: '/post/'
    }
  },
  async created() {
    const res = await axios.get('http://127.0.0.1:8000/post');
    console.log(res.data)
    this.posts = res.data;
  },
  methods: {
    goToPage: function() {
      this.$router.push({ name: 'post', params: { id: this.post.id} })
    }
  }
};
</script>


