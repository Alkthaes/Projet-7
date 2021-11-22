<template>
  <div id="create-post" class="flex-col align-items-center container" style="max-width: 800px">
    <div class="flex-col align-items-center mt-5">
      <form @submit.prevent action="">
        <div class="w-100">
          <label for="title" class="me-3">Entrez un titre : </label>
          <input v-model="title" id="title" name="title" type="text"/>
        </div>
        <div class="mt-3">
          <p>Choisissez une image (formats : jpeg, png ou gif) :</p>
          <UploadImages :max="1" @change="handleImages" style="max-width: 600px" class="my-3" required/>
          <div class="d-flex justify-content-end ms-5" style="max-width: 600px">
            <button class="btn btn-primary btn-lg px-3" type="button" @click="onUpload">Valider</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import UploadImages from 'vue-upload-drop-images';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

export default {
  name: "CreatePost",
  components: {
    UploadImages
  },
  data: function () {
    return {
      selectedFile: null,
      title: ''
    }
  },
  async created() {
    if (this.$store.state.isLoggedIn == false) {
      await this.$router.push({path: '/'})
    }
  },
  methods: {
    async handleImages(event) {
      this.selectedFile = event.target.files[0];
    },
    async onUpload() {
      let fd = new FormData();
      fd.append('title', this.title);
      fd.append('image', this.selectedFile);
      fd.append('user_id', localStorage.getItem('user_id'));

      await axios.post('/post/create', fd, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
          .then(res => console.log(res))
          .catch(err => console.log(err));

      this.$router.push('allposts');
    }
  }
}
</script>
