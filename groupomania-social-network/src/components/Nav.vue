<template>
  <div id="nav" class="flex">
    <img
      src="../assets/icon-left-font-monochrome-black.png"
      alt="logo groupomania"
    />
    <div class="nav-link">
      <router-link to="/">Accueil</router-link>
    </div>
    <div class="nav-link">
      <router-link to="/about">About</router-link>
    </div>
    <div id="login-buttons">
      <router-link to="/login" class="btn btn-login rounded"
        >Connexion</router-link
      >
      <router-link to="/signup" class="btn btn-signup rounded"
        >Inscription</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style lang="scss">
#nav {
  padding: 15px;
  border-bottom: 1px solid #1f1f1f;
  justify-content: space-evenly;
  align-items: baseline;

  & img {
    width: 150px;
    height: 30px;
    position: relative;
    right: 100px;
    top: 5px;
  }
}

.nav-link {
  a {
    font-weight: bold;
    font-size: 18px;
    color: #1f1f1f;
    text-decoration: none;
  }
}

#login-buttons {
  position: relative;
  left: 150px;
}

.btn {
  display: inline-block;
  height: 36px;
  line-height: 36px;
  font-weight: 700;
  padding: 0 16px;
  margin: 0 10px;
  text-decoration: none;

  &-login {
    background-color: #bdbdbd;
    color: #1f1f1f;
  }

  &-signup {
    background-color: #0a89ff;
    color: white !important;
  }
}

.rounded {
  border-radius: 20px;
}
</style>