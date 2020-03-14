<template>
    <div>
        <img v-show="isImageLoaded" class="img-fluid" alt="Corona logo" :src="urlImageSummary" @load="onImgLoad">
        <h1 v-if="!isImageLoaded"><strong>{{ title }}</strong></h1>
        <p>
            Data didapatkan dari <a href="https://github.com/mathdroid/covid-19-api">mathdroid/covid-19-api</a>
        </p>
    </div>
</template>

<script>
    import {
        APIServiceCovid
    } from '../../services/APIServiceCovid';

    const apiService = new APIServiceCovid();

    export default {
        name: "HeaderSummary",
        data() {
            return {
                title: "COVID-19",
                urlImageSummary: String,
                isImageLoaded: false
            };
        },
        methods: {
            getUrlImageSummary() {
                apiService.getDataGlobal().then((data) => {
                    this.urlImageSummary = data.image;
                });
            },
            onImgLoad () {
                this.isImageLoaded = true;
            }
        },
        mounted() {
            this.getUrlImageSummary();
        },
    }
</script>

<style scoped>

</style>