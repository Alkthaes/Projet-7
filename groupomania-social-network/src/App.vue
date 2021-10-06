<template>
  <div id="app">
    <Nav />
    <router-view />
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";

export default {
  name: "App",
  components: {
    Nav,
  },
};
</script>


<style lang="scss">
body {
  background-color: #c2dfe3;
  margin: 0px;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue,
    Arial, Helvetica, Geneva, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
