<template>
  <div id="signup" class="container mt-5">
    <div class="card rounded d-flex-column align-items-center w-auto shadow p-5">
      <div class="card-body text-center">
        <h1 class="mb-5">Inscription</h1>

        <p>
          Déjà un compte ?
          <router-link class="fst-italic" to="/login">Se connecter</router-link>
        </p>

        <form @submit.prevent action="#">

          <div>
            <label for="lastname">Nom :</label>
            <input class="form-control" type="text" name="lastname" id="lastname" v-model="lastname"/>
          </div>

          <div>
            <label for="firstname">Prénom :</label>
            <input class="form-control" type="text" name="firstname" id="firstname" v-model="firstname"/>
          </div>

          <div>
            <label for="email">Adresse email<span>(professionnelle ou personnelle)</span>:</label>
            <input class="form-control" type="email" name="email" id="email" v-model="email"/>
          </div>

          <div>
            <label for="password">Mot de passe :</label>
            <input class="form-control" type="password" name="password" id="password" v-model="password"/>
          </div>

          <button class="btn btn-primary btn-lg mt-3" type="submit" @click="createAccount">Inscription</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Signup",
  data: () => {
    return {
      lastname: '',
      firstname: '',
      email: '',
      password: '',
      picture: '../assets/default-avatar.jpg',
    }
  },
  methods: {
    createAccount: function () {
      this.$store.dispatch('createAccount', {
        lastname: this.lastname,
        firstname: this.firstname,
        email: this.email,
        password: this.password,
        picture: this.picture
      })
    }
  }
}
</script>

