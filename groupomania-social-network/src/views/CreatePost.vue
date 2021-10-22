<template>
  <div id="create-post" class="flex-col align-items-center">
    <div class="container flex-col align-items-center">
      <form @submit.prevent action="">
        <div>
          <label for="title">Entrez un titre :</label>
          <input v-model="title" id="title" name="title" type="text" />
        </div>
        <div>
          <p>Choisissez une image (formats : jpeg, png ou gif) :</p>
          <UploadImages :max="1" @change="handleImages" />
          <button type="button" @click="onUpload">Valider</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import UploadImages from 'vue-upload-drop-images';
import axios from 'axios';

export default {
  name: "CreatePost",
  components: {
    UploadImages
  },
  data: function() {
    return {
      selectedFile: null,
      title: ''
    }
  },
  methods: {
    handleImages(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
    },
    onUpload() {
      const fd = new FormData();
      fd.append('image', this.selectedFile, this.selectedFile.name);
      fd.append('title', this.title);
      fd.append('user_id', localStorage.getItem('user_id'));

      console.log(fd);

      axios.post('http://127.0.0.1:8000/post/create', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
          .then(res => console.log(res))
          .catch(err => console.log(err));

    }
  }
}
</script>

<style scoped lang="scss">

</style>