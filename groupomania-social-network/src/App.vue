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
  margin: 0;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue,
    Arial, Helvetica, Geneva, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  height: 100%;
  width: 700px;
}

.flex {
  display: flex;
  &-col {
    display: flex;
    flex-direction: column;
  }
}

.align-items-center {
  align-items: center;
}

.justify-content {
  justify-content: flex-start;

  &-evenly {
    justify-content: space-evenly;
  }
}
</style>
