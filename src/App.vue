<template>
    <div id="app" class="container">
        <HeaderSummary/>
        <SummaryIndonesia/>
<!--        <TrendGlobalDaily/>-->
<!--        <SummaryTrendIndonesia/>-->
        <TableDetailGlobal/>
        <Footer/>
    </div>
</template>

<script>
    import HeaderSummary from './components/global/Summary.vue'
    import TableDetailGlobal from './components/global/DataTable.vue'
    // import TrendGlobalDaily from "./components/TrendGlobalDaily";
    // import SummaryTrendIndonesia from "./components/SummaryTrendIndonesia";
    import Footer from "./components/footer/Footer";
    import SummaryIndonesia from "./components/indonesia/Summary";

    export default {
        name: 'App',
        components: {
            HeaderSummary,
            TableDetailGlobal,
            SummaryIndonesia,
            // TrendGlobalDaily,
            // SummaryTrendIndonesia,
            Footer
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

    .card {
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .card-header {
        font-size: large;
        font-weight: bold;
    }

    .card-body {
        /*display: flex;*/
        /*justify-content: center;*/
        /*align-items: center;*/
    }
</style>
