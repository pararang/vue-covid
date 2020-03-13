<template>
    <div>
        <img alt="Corona logo" :src="urlImageSummary">
        <h1>{{ title }}</h1>
        <p>
            Data didapatkan dari <a href="https://github.com/mathdroid/covid-19-api">mathdroid/covid-19-api</a>
        </p>
    </div>
</template>

<script>
    import {
        APIService
    } from '../APIService';

    const apiService = new APIService();

    export default {
        name: "HeaderSummary",
        data() {
            return {
                urlImageSummary: String,
            };
        },
        methods: {
            getUrlImageSummary() {
                apiService.getDataGlobal().then((data) => {
                    this.urlImageSummary = data.image;
                });
            }
        },

        mounted() {
            this.getUrlImageSummary();
        },
    }
</script>

<style scoped>

</style>