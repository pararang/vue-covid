<template>
    <footer class="page-footer font-small blue">
        <div class="footer-copyright text-center py-3">© 2020
            <a href="https://pararang.github.io/"> Muhammad Ikhsan</a>
        </div>
    </footer>
</template>

<script>
    import moment from "moment";

    export default {
        name: "Footer",
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