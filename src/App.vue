<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import Shows from './components/Shows.vue'
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
.toast {
  position: fixed;
  top: 0 !important;
  right: 20px !important;
}
</style>
