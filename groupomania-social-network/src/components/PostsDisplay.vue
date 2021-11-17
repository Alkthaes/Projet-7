<template>
  <div id="Home" class="container d-flex justify-content-center">
    <ul class="p-0 mt-5">

      <li v-for="post in posts" class="card mb-5 w-100" style="max-width: 800px" :key="post.id">
        <div class="card-header d-flex justify-content-between">
          <h2 class="fs-2">{{ post.titre }}</h2>
          <p><span class="fst-italic">posté par :</span>
            <img class="rounded-circle mx-1" :src="post.user.picture" alt="" width="30">
            <a :href="'/post/user/' + post.user.id" class="text-decoration-none fw-bold">{{ post.user.firstname }}</a>
          </p>
        </div>

        <img :src="post.image" alt="" class="img-fluid"/>

        <div class="card-footer d-flex justify-content-end">

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
export default {
  name: 'PostsDisplay',
  props: {
    posts: Array,
    staticUrl: String
  },
}
</script>

