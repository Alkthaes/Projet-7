<template>
  <div id="profile" class="container mt-5">
    <div class="row row-lg-cols-2">

      <div class="col-sm-12 col-lg-3 order-1 order-sm-2">
        <div class="card d-flex-column align-items-center">

          <img class="border rounded-circle mt-3" v-bind:src="userInfo.picture || defaultImage"  style="max-width: 150px; height: 150px"
               alt="photo de profile utilisateur">
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-outline-primary my-3" data-bs-toggle="modal" data-bs-target="#avatarModal">
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
                  <UploadImages @change="handleImage" :max="1" required/>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                  <button type="button" class="btn btn-primary" @click="uploadAvatar">Enregistrer</button>
                </div>
              </div>
            </div>

          </div>

          <ul class="list-group list-group-flush text-center">
            <li class="list-group-item">
              <a :href="'/post/user/' + id" class="nav-link text-dark fw-bold">Mes posts</a>
            </li>
            <li class="list-group-item">
              <div class="nav-link text-dark fw-bold" style="cursor: pointer" @click="switchToEdit">
                Modifier les informations
              </div>
            </li>
            <li class="list-group-item">
              <!-- Button trigger modal -->
              <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
                Supprimer le compte
              </button>

              <!-- Modal -->
              <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="deleteModalLabel">Suppression du compte</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      Souhaitez-vous vraiment supprimer votre compte ?
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                      <button type="button" class="btn btn-primary" @click="deleteAccount">Confirmer</button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>
      <!-- User infos -->
      <div class="col-sm-12 col-lg-8 order-lg-last order-sm-1" v-if="editMode==false">

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

      <div class="col-sm-12 col-lg-8 order-lg-2 order-sm-1" v-if="editMode==true">

        <div class="card ">

          <div class="card-title">
            <h1 class="fw-bold fs-4 m-3">Entrer les nouvelles informations</h1>
          </div>


          <div class="card-body">
            <form action="" @submit.prevent>

              <div class="row align-items-center my-3">
                <div class="col">
                  <label for="lastname" class="col-form-label">Nom</label>
                </div>
                <div class="col">
                  <input v-model="lastname" type="text" id="lastname" name="lastname" class="form-control" :placeholder="userInfo.lastname">
                </div>
              </div>

              <div class="row align-items-center my-3">
                <div class="col">
                  <label for="firstname" class="col-form-label">Prénom</label>
                </div>
                <div class="col">
                  <input v-model="firstname" type="text" id="firstname" name="firstname" class="form-control" :placeholder="userInfo.firstname">
                </div>
              </div>

              <div class="row align-items-center my-3">
                <div class="col">
                  <label for="email" class="col-form-label">Changer l'adresse email</label>
                </div>
                <div class="col">
                  <input v-model="email" type="email" id="email" name="email" class="form-control" :placeholder="userInfo.email">
                </div>
              </div>

              <div class="row align-items-center my-3">
                <div class="col">
                  <label for="password" class="col-form-label">Changer de mot de passe</label>
                </div>
                <div class="col">
                  <input v-model="password" type="password" id="password" name="password" class="form-control">
                </div>
              </div>

              <div class="row align-items-center my-3">
                <div class="col">
                  <label for="secteur" class="col-form-label">Secteur</label>
                </div>
                <div class="col">
                  <input v-model="secteur" type="text" id="secteur" name="secteur" class="form-control" :placeholder="secteurIsNull">
                </div>
              </div>

              <div class="row align-items-center my-3">
                <div class="col">
                  <label for="fonction" class="col-form-label">Fonction</label>
                </div>
                <div class="col">
                  <input v-model="fonction" type="text" id="fonction" name="fonction" class="form-control" :placeholder="fonctionIsNull">
                </div>
              </div>

              <button class="btn btn-primary" @click="submitChanges">Enregistrer</button>

            </form>


          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import UploadImages from 'vue-upload-drop-images';
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

export default {
  name: "Profile",
  components: {
    UploadImages
  },
  data: function () {
    return {
      userInfo: null,
      selectedFile: null,
      editMode: false,
      id: localStorage.getItem('user_id'),
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      secteur: '',
      fonction: '',
      imageError: false,
      defaultImage: require('../../../backend/images/default-avatar.jpg')
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
    },
  },
  async created() {
    if (this.$store.state.isLoggedIn == false) {
      await this.$router.push({path: '/'})
    }

    const userId = localStorage.getItem('user_id');

    try {
      const res = await axios.get(`/auth/user/${userId}`);

      this.userInfo = res.data.user;
      console.log(this.userInfo);

    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async handleImage(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile)
    },
    async uploadAvatar() {
      const fd = new FormData();
      fd.append('image', this.selectedFile);
      fd.append('id', this.id);

      await axios.put('auth/update/avatar', fd, {
        headers: {'Content-type': 'multipart/form-data'}
      })
          .then(res => console.log(res))
          .catch(err => console.log(err));

      location.reload();
    },
    switchToEdit() {
      this.editMode = true
    },
    async submitChanges() {
      await axios.put('/auth/update/infos', {
        'id': this.id,
        'lastname': this.lastname,
        'firstname': this.firstname,
        'email': this.email,
        'password': this.password,
        'secteur': this.secteur,
        'fonction': this.fonction
      })
          .then(res => console.log(res))
          .catch(err => console.log(err));

      location.reload();
    },
    deleteAccount() {
      this.$store.dispatch('deleteAccount', this.userInfo.id);
    }
  }
};
</script>