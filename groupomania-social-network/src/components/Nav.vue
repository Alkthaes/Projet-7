<template>
  <div id="nav">
    <img
      src="../assets/icon-left-font-monochrome-white.png"
      alt="logo groupomania"
    />
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/login">Log in</router-link> |
    <router-link to="/signup">Sign Up</router-link>
  </div>
</template>

<style lang="scss">
#nav {
  padding: 30px;
  background-color: #253237;
  border-bottom: 1px solid #c2dfe3;

  a {
    font-weight: bold;
    color: #fff;
    text-decoration: none;

    &.router-link-exact-active {
      text-decoration: underline;
    }
  }
  & img {
    width: 150px;
    height: 25px;
  }
}
</style>