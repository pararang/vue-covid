<template>
    <div id="app" class="container">
        <SummaryGlobal/>
        <SummaryIndonesia/>
       <TrendGlobalDaily/>
        <!-- <DataTableIndonesia/> -->
        <DataTableGlobal/>
        <Footer/>
    </div>
</template>

<script>
    import SummaryGlobal from './components/global/Summary'
    import SummaryIndonesia from "./components/indonesia/Summary";
    // import DataTableIndonesia from "./components/indonesia/DataTable";
    import TrendGlobalDaily from "./components/global/TrendDaily";
    import DataTableGlobal from './components/global/DataTable'
    import Footer from "./components/footer/Footer";

    export default {
        name: 'App',
        components: {
            SummaryGlobal,
            SummaryIndonesia,
            // DataTableIndonesia,
            TrendGlobalDaily,
            DataTableGlobal,
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
