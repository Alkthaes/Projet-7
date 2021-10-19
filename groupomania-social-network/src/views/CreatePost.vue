<template>
  <div id="create-post" class="flex-col align-items-center">
    <div class="container flex-col align-items-center">
      <form @submit.prevent action="">
        <div>
          <label for="title">Entrez un titre :</label>
          <input id="title" name="title" type="text" />
        </div>
        <div>
          <label for="image">Choisissez une image (formats : jpeg, png ou gif) :</label>
          <input id="image" name="image" type="file" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreatePost"
}
</script>

<style scoped lang="scss">

</style>