<template>
  <div id="post" class="container mt-5 d-flex justify-content-center">

    <div class="card" style="max-width: 800px">
      <div class="card-header d-flex justify-content-between">
        <h1 class="fs-2">{{ post.title }}</h1>
        <p>posté par:
          <img class="rounded-circle mx-1" :src="post.User.picture" alt="" width="30" height="30">
          <a :href="'/post/user/' + post.User.id" class="text-decoration-none fw-bold">{{ post.User.firstname }}</a>
        </p>
      </div>

      <img :src="post.image" alt="">

      <div class="card-footer d-flex justify-content-end">

        <!-- Dropdown menu -->
        <div v-if="(post.User.id == user_id ) || role" class="dropdown d-inline-block mx-5">
          <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1"
                  data-bs-toggle="dropdown" aria-expanded="false">
            Options
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item btn" :href="'/edit/post/' + post.id">Editer</a></li>
            <li><p class="dropdown-item btn" @click="this.$store.dispatch('deletePost', post.id)">Supprimer</p></li>

          </ul>
        </div>

        <div class="btn btn-outline-secondary rounded">
          <i class="fas fa-comment-alt"></i>
          <span class="ms-2 fw-bold fs-5">{{ post.Comments.length }}</span>
        </div>

      </div>

      <div class="card">
        <div class="card-body">
          <h2 class="fs-5">Ajouter un commentaire</h2>
          <div class="d-flex justify-content-center">
            <textarea v-model="comment" name="comment-space" id="comment-space" cols="85" rows="5" autofocus></textarea>
          </div>
          <div class="d-flex justify-content-end">

            <button class="btn btn-primary rounded mt-1" @click="sendComment">Envoyer</button>
          </div>
        </div>
      </div>

      <div class="card">
        <ul class="list-group list-group-flush">
          <li v-for="comment in comments" class="list-group-item" :key="comment.id">
            <p>{{ comment.content }}</p>
            <hr>
            <div class="d-flex justify-content-between">
              <p class="fst-italic">{{ comment.User.firstname }}</p>

              <!-- Dropdown menu -->
              <div v-if="(comment.User.id == user_id ) || role" class="dropdown d-inline-block mx-5">
                <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton2"
                        data-bs-toggle="dropdown" aria-expanded="false">
                  Options
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                  <li><p class="dropdown-item btn" @click="this.$store.dispatch('deleteComment', comment.id)">Supprimer</p></li>

                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

export default {
  name: 'post',
  data() {
    return {
      post: null,
      comment: '',
      comments: null,
      user_id: localStorage.user_id,
      role: null
    }
  },
  async created() {

    if (localStorage.role) {
      this.role = localStorage.role;
    }

    const res = await axios.get(`/post/${this.$route.params.id}`);
    const resComment = await axios.get('/comments/post/' + this.$route.params.id);

    this.comments = resComment.data.comments;
    this.post = res.data.post;

    console.log(this.post);
    console.log(resComment.data);
  },
  methods: {
    sendComment() {
      axios.post('/comment/create', {
        'content': this.comment,
        'post_id': this.$route.params.id,
        'user_id': localStorage.getItem('user_id')
      })
          .then(res => console.log(res))
          .catch(err => console.log(err));

      location.reload();
    },
  }
}


</script>