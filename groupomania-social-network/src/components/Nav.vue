<template>
  <div id="nav" class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a href="/allposts" class="navbar-brand ms-3">
        <img
            src="../assets/icon-left-font-monochrome-black.png"
            alt="logo groupomania" width="200"
        />
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">

          <router-link to="/allposts" class="nav-link text-dark fs-4 fw-bold">Accueil
          </router-link>


        <div v-if="this.$store.state.isLoggedIn == true">
          <router-link class="btn btn-outline-primary rounded-pill mx-3" to="/createpost">
            <i class="fas fa-plus"></i>
            Créer un post
          </router-link>

          <button @click="this.$store.dispatch('logout')" class="btn btn-secondary rounded-pill mx-3">Déconnexion</button>

          <router-link to="/profile" class="btn btn-primary rounded-pill m-3">Mon compte</router-link>
        </div>

        <div v-else>
          <router-link to="/login" class="btn btn-secondary rounded-pill mx-3"
          >Connexion
          </router-link
          >
          <router-link to="/signup" class="btn btn-primary rounded-pill mx-3"
          >Inscription
          </router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  mounted() {
    if (localStorage.token) {
      this.$store.commit('loggedIn')
    } else {
      this.$store.commit('loggedOut')
    }
  }
};
</script>

