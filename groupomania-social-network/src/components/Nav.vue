<template>
  <div id="nav" class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
    <a href="/" class="navbar-brand ms-3">
      <img
          src="../assets/icon-left-font-monochrome-black.png"
          alt="logo groupomania" width="200"
      />
    </a>

    <div>
      <router-link to="/" class="nav-link text-dark fs-4 fw-bold">Accueil</router-link>
    </div>

    <div v-if="this.token != ''" >
      <router-link class="btn btn-outline-primary rounded-pill mx-3" to="/createpost">
        <i class="fas fa-plus"></i>
        Créer un post
      </router-link>

      <button @click="this.$store.commit('logOut')" class="btn btn-secondary rounded-pill mx-3">Déconnexion</button>

      <router-link to="/profile" class="btn btn-primary rounded-pill mx-3">Mon compte</router-link>
    </div>

    <div v-else >
      <router-link to="/login" class="btn btn-secondary rounded-pill mx-3"
        >Connexion</router-link
      >
      <router-link to="/signup" class="btn btn-primary rounded-pill mx-3"
        >Inscription</router-link
      >
    </div>

  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      token: ''
    }
  },
  mounted() {
    if (localStorage.token) {
      this.token = localStorage.token
    }
  }
};
</script>

