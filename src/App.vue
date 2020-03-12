<template>
  <div id="app">
    <img alt="Corona logo" src="./assets/virus_corona.png">
    <Header title="Informasi Covid 19"/>
    <!-- <Current msg="Message"/> -->
  </div>
</template>

<script>
import Header from './components/Header.vue'
// import Current from './components/Current.vue'

export default {
  name: 'App',
  components: {
    Header,
    // Current
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
