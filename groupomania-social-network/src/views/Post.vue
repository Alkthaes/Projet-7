<template>
  <div id="post" class="container mt-5 d-flex justify-content-center">

    <div class="card" style="max-width: 900px">
      <div class="card-header d-flex justify-content-between">
        <h1 class="fs-2">{{ post.titre }}</h1>
        <p>posté par:
          <img class="rounded-circle mx-1" :src="post.user.picture" alt="" width="30">
          <a :href="'/post/user/' + post.user.id" class="text-decoration-none fw-bold">{{ post.user.firstname }}</a>
        </p>
      </div>

      <img :src="post.image" alt="">

      <div class="card-footer d-flex justify-content-around">

        <div class="btn btn-outline-secondary rounded">
          <i class="fas fa-comment-alt"></i>
          <span class="ms-2 fw-bold fs-5">{{ comments.length }}</span>
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
            <p class="fst-italic">{{ comment.user.firstname }}</p>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'post',
  data() {
    return {
      post: {},
      comments: [],
      comment: '',
    }
  },
  async created() {

    const resPost = await axios.get(`http://127.0.0.1:8000/post/${this.$route.params.id}`);
    console.log(resPost.data);
    const resComment = await axios.get(`http://127.0.0.1:8000/comment/post/${this.$route.params.id}`);
    console.log(resComment.data);

    this.comments = resComment.data;
    this.post = resPost.data;
  },
  methods: {
    sendComment() {
      axios.post('http://127.0.0.1:8000/comment/create', {
        'content': this.comment,
        'post_id': this.$route.params.id,
        'user_id': localStorage.getItem('user_id')
      })
          .then(res => console.log(res))
          .catch(err => console.log(err));

      this.$router.go();
    },
  }
}


</script>