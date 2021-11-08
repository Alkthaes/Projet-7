<template>
  <div id="profile" class="container mt-5">
    <div class="row">

      <div class="col card d-flex-column align-items-center p-4" style="max-width: 250px">

        <img class="border rounded-circle" style="max-width: 200px" v-bind:src="userInfo.picture"
             alt="photo de profile utilisateur">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#avatarModal">
          Modifier l'avatar
        </button>

        <!-- Modal -->
        <div class="modal fade" id="avatarModal" tabindex="-1" aria-labelledby="avatarModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="avatarModalLabel">Sélectionnez une image</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <UploadImages :max="1" @change="handleImages" required/>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button type="button" class="btn btn-primary" @click="uploadAvatar">Enregistrer</button>
              </div>
            </div>
          </div>

        </div>

        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <a href="/" class="nav-link text-dark fw-bold">Mes posts</a>
          </li>
        </ul>

      </div>
      <div class="col-8">
        <div class="card w-100 d-inline-block">
          <div class="card-title">
            <h1 class="fw-bold fs-4 m-3">Informations personnelles</h1>
          </div>
          <div class="card-body">
          <p>Nom: {{ userInfo.lastname }}</p>
          <p>Prénom: {{ userInfo.firstname }}</p>
          <p>Adresse email: {{ userInfo.email }}</p>
          <p>Secteur: {{ secteurIsNull }}</p>
          <p>Fonction: {{ fonctionIsNull }}</p>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import UploadImages from 'vue-upload-drop-images';
import axios from "axios";

export default {
  name: "Profile",
  components: {
    UploadImages
  },
  data: function () {
    return {
      userInfo: {},
      selectedFile: null,
      encodedFile: null
    }
  },
  computed: {
    fonctionIsNull() {
      if (this.userInfo.fonction == null) {
        return 'Non renseigné';
      } else {
        return this.userInfo.fonction;
      }
    },
    secteurIsNull() {
      if (this.userInfo.secteur == null) {
        return 'Non renseigné';
      } else {
        return this.userInfo.secteur;
      }
    }
  },
  async created() {
    const userId = localStorage.getItem('user_id');

    try {
      const res = await axios.get(`http://127.0.0.1:8000/user/account/${userId}`);

      this.userInfo = res.data;

    } catch (error) {
      console.log(error);
    }
  },
  methods: {
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
    async uploadAvatar() {
      await axios.put('http://127.0.0.1:8000/user/update/avatar', {
        "user_id": this.userInfo.id,
        'picture': this.encodedFile
      })
          .then(res => console.log(res))
          .catch(err => console.log(err));

      this.$router.go();
    }
  }
};
</script>
