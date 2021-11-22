<template>
  <div class="container">
    <div id="post" class="container mt-5 d-flex justify-content-center">

      <div class="card" style="max-width: 800px">
        <div v-if="this.editText == false" class="card-header d-flex justify-content-between">
          <h1 class="fs-2">
            {{ post.title }}
            <button class="btn btn-primary" @click="switchToEditText">
              <i class="fas fa-edit"></i>
            </button>
          </h1>
          <p>posté par:
            <img class="rounded-circle mx-1" :src="post.User.picture" alt="" width="30" height="30">
            <a :href="'/post/user/' + post.User.id" class="text-decoration-none fw-bold">{{ post.User.firstname }}</a>
          </p>
        </div>

        <div v-if="this.editText == true" class="card-header d-flex justify-content-between">
          <input v-model="newTitle" type="text" placeholder="Nouveau titre...">
          <button class="btn btn-primary" @click="editTitle">Enregistrer</button>

          <p>posté par:
            <img class="rounded-circle mx-1" :src="post.User.picture" alt="" width="30" height="30">
            <a :href="'/post/user/' + post.User.id" class="text-decoration-none fw-bold">{{ post.User.firstname }}</a>
          </p>
        </div>

        <div v-if="this.editImageMod == false" class="position-relative">
        <img :src="post.image" alt="" style="max-width: 798px">
          <button class="btn btn-primary position-absolute top-0 end-0 m-3" @click="switchToEditImage">
            <i class="fas fa-edit"></i>
          </button>
        </div>

        <div v-if="this.editImageMod == true" class="position-relative">
          <UploadImages :max="1" @change="handleImages" class="w-100" required/>
          <div class="d-flex justify-content-end ms-5" style="max-width: 800px">
            <button class="btn btn-primary btn-lg px-3" type="button" @click="editImage">Valider</button>
          </div>
        </div>



      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UploadImages from 'vue-upload-drop-images';

axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

export default {
  name: "editPost",
  components: {
    UploadImages
  },
  data() {
    return {
      post: null,
      editText: false,
      editImageMod: false,
      newTitle: '',
      selectedFile: null
    }
  },
  async created() {
    if (this.$store.state.isLoggedIn == false) {
      await this.$router.push({path: '/'})
    }

    const resPost = await axios.get(`/post/${this.$route.params.id}`);
    console.log(resPost.data.post);

    this.post = resPost.data.post;
  },
  methods: {
    switchToEditText() {
      this.editText = true;
    },
    switchToEditImage() {
      this.editImageMod = true;
    },
    async handleImages(event) {
      this.selectedFile = event.target.files[0];
    },
    editImage() {
      const fd = new FormData();
      fd.append('image', this.selectedFile);
      axios.put('/post/edit/image/' + this.$route.params.id, fd)
          .then(function(res) {
            console.log(res);
            location.reload();
          })
          .catch(err => console.log(err));
    },
    editTitle() {
      axios.put('/post/edit/title/' + this.$route.params.id, {"title": this.newTitle})
          .then(function(res) {
            console.log(res);
            location.reload();
          })
          .catch(res => console.log(res));
    }
  }
}
</script>
