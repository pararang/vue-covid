<template>
    <footer class="page-footer font-small blue">
        <p>
            Sumber data berasal dari API yang dikembangkan oleh <a href="https://github.com/mathdroid">mathdroid</a>
        </p>
        <AboutRepo></AboutRepo>
    </footer>
</template>

<script>
    import moment from "moment";
    import AboutRepo from "./AboutRepo";

    export default {
        name: "Footer",
        components: {
            AboutRepo,
        },
        data() {
            return {
                year: 0,
            };
        },
        methods: {

        },
        mounted() {
            this.year = moment().format('YYYY');
        },
    }
</script>

<style scoped>

</style>