<template>
  <div id="app">
    <img alt="Corona logo" src="./assets/virus_corona.png">
    <Header title="DATA COVID-19"/>
    <DataGlobal></DataGlobal>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import DataGlobal from './components/DataGlobal.vue'

export default {
  name: 'App',
  components: {
    Header,
    DataGlobal
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
