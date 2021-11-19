<template>
  <div class="container">
    <div id="post" class="container mt-5 d-flex justify-content-center">

      <div class="card" style="max-width: 800px">
        <div v-if="this.editText == false" class="card-header d-flex justify-content-between">
          <h1 class="fs-2">
            {{ post.titre }}
            <button class="btn btn-primary" @click="switchToEditText">
              <i class="fas fa-edit"></i>
            </button>
          </h1>
          <p>posté par:
            <img class="rounded-circle mx-1" :src="post.user.picture" alt="" width="30">
            <a :href="'/post/user/' + post.user.id" class="text-decoration-none fw-bold">{{ post.user.firstname }}</a>
          </p>
        </div>

        <div v-if="this.editText == true" class="card-header d-flex justify-content-between">
          <input v-model="newTitle" type="text" placeholder="Nouveau titre...">
          <button class="btn btn-primary" @click="editTitle">Enregistrer</button>

          <p>posté par:
            <img class="rounded-circle mx-1" :src="post.user.picture" alt="" width="30">
            <a :href="'/post/user/' + post.user.id" class="text-decoration-none fw-bold">{{ post.user.firstname }}</a>
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

export default {
  name: "editPost",
  components: {
    UploadImages
  },
  data() {
    return {
      post: {},
      editText: false,
      editImageMod: false,
      newTitle: '',
      selectedFile: null,
      encodedFile: null
    }
  },
  async created() {

    const resPost = await axios.get(`http://127.0.0.1:8000/post/${this.$route.params.id}`);
    console.log(resPost.data);

    this.post = resPost.data;
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
      console.log(this.selectedFile);
      const reader = new FileReader();

      let rawImg;
      reader.onloadend = () => {
        rawImg = reader.result;
        console.log(rawImg);
        this.encodedFile = rawImg;
        console.log(this.encodedFile);
      }
      reader.readAsDataURL(this.selectedFile);
    },
    editImage() {

      axios.put('http://127.0.0.1:8000/post/edit/image/' + this.$route.params.id, {'image': this.encodedFile})
          .then(function(res) {
            console.log(res);
            location.reload();
          })
          .catch(err => console.log(err));
    },
    editTitle() {
      axios.put('http://127.0.0.1:8000/post/edit/title/' + this.$route.params.id, {"titre": this.newTitle})
          .then(function(res) {
            console.log(res);
            location.reload();
          })
          .catch(res => console.log(res));
    }
  }
}
</script>
