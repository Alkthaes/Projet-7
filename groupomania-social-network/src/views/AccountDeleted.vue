<template>
  <div class="container">
    <div class="card m-5 text-center">
      <h1 class="my-5">Votre compte a bien été supprimé</h1>
        <p class="my-5">Vous allez être redirigé dans quelques instants</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountDeleted",
  created() {
    setTimeout( () => {
      this.$router.push({path: '/'});
    }, 5000);
  }
}
</script>

