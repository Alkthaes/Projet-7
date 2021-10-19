<template>
  <div id="signup" class="flex-col align-items-center">
    <div class="container flex-col align-items-center">
      <h1>Inscription</h1>

      <p>
        Déjà un compte ?
        <router-link class="pseudo_link" to="/login">Se connecter</router-link>
      </p>

      <form @submit.prevent class="form_layout flex-col align-items-center" action="#">

        <div class="form-layout flex-col align-items-center">
          <label for="lastname">Nom :</label>
          <input type="text" name="lastname" id="lastname" v-model="lastname"/>
        </div>

        <div class="form-layout flex-col align-items-center">
          <label for="firstname">Prénom :</label>
          <input type="text" name="firstname" id="firstname" v-model="firstname"/>
        </div>

        <div class="form-layout flex-col align-items-center">
          <label for="email">Adresse email<span>(professionnelle ou personnelle)</span>:</label>
          <input type="email" name="email" id="email" v-model="email"/>
        </div>

        <div class="form-layout flex-col align-items-center">
          <label for="password">Mot de passe :</label>
          <input type="password" name="password" id="password" v-model="password"/>
        </div>

        <button class="submit-btn" type="submit" @click="createAccount">Inscription</button>
      </form>
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
    createAccount: function ()  {
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

<style scoped lang="scss">
h1 {
  font-size: 40px;
}


form.form_layout {
  width: 700px;
  height: auto;
  margin-top: 20px;
  padding-top: 50px;
  border-radius: 15px;
  -webkit-box-shadow: 6px 11px 15px -2px rgba(29, 53, 87, 0.66);
  box-shadow: 6px 11px 15px -2px rgba(29, 53, 87, 0.66);
}

div.form-layout {
  font-size: 20px;
}

label {
  margin: 5px 0 5px 0;
}

span {
  font-size: 14px;
  font-style: italic;
}

.pseudo_link {
  font-size: 14px;
  font-style: italic;
  text-decoration: underline;
  color: #00a6fb;
  cursor: pointer;
}

input {
  height: 25px;
  width: 250px;
  margin: 10px 0 10px 0;
  border-radius: 15px;
  border: 1px solid #bdbdbd;

  &#avatar {
    border: none;
    border-radius: 0;
  }
}

#signup-avatar {
  width: 100px;
  height: 100px;
  border: 5px solid #bdbdbd;
  margin-right: 25px;
}

.submit-btn {
  background-color: #0a89ff;
  border: none;
  border-radius: 20px;
  height: 36px;
  line-height: 36px;
  padding: 0 16px;
  margin: 25px 0;
  color: white;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
}
</style>