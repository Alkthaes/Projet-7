<template>
  <div class="container">
    <h1 v-if="mode == 'login'">Connexion</h1>
    <h1 v-else>Inscription</h1>
    <p v-if="mode == 'login'">
      Pas encore de compte ?
      <span class="pseudo_link" @click="switchToCreateAccount()"
        >Créer un compte</span
      >
    </p>
    <p v-else>
      Tu as déjà un compte ?
      <span class="pseudo_link" @click="switchToLogin()">Se connecter</span>
    </p>
    <form class="form_layout" action="">
      <div v-if="mode == 'create'" class="form-layout">
        <label for="lastname">Nom :</label>
        <input type="text" name="lastname" id="lastname" />
      </div>
      <div v-if="mode == 'create'" class="form-layout">
        <label for="firstname">Prénom :</label>
        <input type="text" name="firstname" id="firstname" />
      </div>
      <div class="form-layout">
        <label for="email"
          >Adresse email
          <span v-if="mode == 'login'"
            >(professionnelle ou personnelle) :</span
          ></label
        >
        <input type="email" name="email" id="email" />
      </div>
      <div class="form-layout">
        <label for="password">Mot de passe :</label>
        <input type="password" name="password" id="password" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return {
      mode: "login",
    };
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
  },
};
</script>

<style scoped lang="scss">
h1 {
  font-size: 40px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

form.form_layout {
  width: 700px;
  height: 500px;
  margin-top: 20px;
  padding-top: 100px;
  background-color: #e0fbfc;
  border-radius: 15px;
  -webkit-box-shadow: 6px 11px 15px -2px rgba(29, 53, 87, 0.66);
  box-shadow: 6px 11px 15px -2px rgba(29, 53, 87, 0.66);
  display: flex;
  flex-direction: column;
  align-items: center;
}

div.form-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
}

label {
  margin: 5px 0 5px 0;
}

span {
  font-size: 14px;
  font-style: italic;

  &.pseudo_link {
    text-decoration: underline;
    color: #00a6fb;
    cursor: pointer;
  }
}

input {
  height: 25px;
  width: 250px;
  margin: 10px 0 10px 0;
}
</style>
