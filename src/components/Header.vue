<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <p>
      Data didapatkan dari <a href="https://github.com/mathdroid/covid-19-api">mathdroid/covid-19-api</a> 
    </p>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
