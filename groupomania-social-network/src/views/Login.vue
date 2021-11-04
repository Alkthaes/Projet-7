<template>
  <div id="login" class="container mt-5">
    <div class="card rounded d-flex-column align-items-center w-auto shadow p-5">
      <div class="card-body text-center">
        <h1 class="mb-5">Connexion</h1>

        <p>
          Pas encore de compte ?
          <router-link class="fst-italic" to="/signup">Créer un compte</router-link>
        </p>

        <form @submit.prevent action="#">

          <div>
            <label for="email">Adresse email :</label>
            <input class="form-control" type="email" name="email" id="email" v-model="email"/>
          </div>

          <div>
            <label for="password">Mot de passe :</label>
            <input class="form-control" type="password" name="password" id="password" v-model="password"/>
          </div>

          <button @click="login" class="btn btn-primary btn-lg mt-3">Se connecter</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      this.$store.dispatch('login', {
            email: this.email,
            password: this.password
          }
      )
    }
  }
};
</script>




