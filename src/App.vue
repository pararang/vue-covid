<template>
    <div id="app">
      <HeaderSummary/>
      <div class="card-body">
        <TableDetailGlobal/>
      </div>
    </div>
</template>

<script>
    import HeaderSummary from './components/HeaderSummary.vue'
    import TableDetailGlobal from './components/TableDetailGlobal.vue'

    export default {
        name: 'App',
        components: {
            HeaderSummary,
            TableDetailGlobal
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
    .card-body {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
</style>
