<template>
  <div id="app">
    <Shows/>
  </div>
</template>

<script>
import Shows from './components/Shows.vue'

export default {
  name: 'App',
  components: {
    Shows
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 2rem;
}
</style>
