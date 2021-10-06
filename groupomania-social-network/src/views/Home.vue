<template>
  <div class="home flex_col_center">
    <div class="container">
      <div class="card">
        <div class="card_title">First post</div>
        <div class="card_image">
          <img src="../assets/icon-above-font.png" alt="" />
        </div>
        <div class="card_interact">
          <div class="likes">
            <div class="likes_plus">like icone</div>
            <div class="likes_minus">dislike icone</div>
          </div>
          <div class="comments">comments icone</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
};
</script>

<style lang="scss">
#home {
  background-color: #1d1d1d;
}

.flex {
  display: flex;

  &_col {
    flex-direction: column;

    &_center {
      align-items: center;
    }
  }
}

.container {
  width: 70%;
  height: 100%;
  background-color: #9db4c0;
}

.card {
  background-color: #d9dcd6;
}
</style>
