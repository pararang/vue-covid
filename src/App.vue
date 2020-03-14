<template>
    <div id="app" class="container">
        <HeaderSummary :title="COR"/>
        <TrendGlobalDaily/>
        <SummaryTrendIndonesia/>
        <TableDetailGlobal/>
    </div>
</template>

<script>
    import HeaderSummary from './components/HeaderSummary.vue'
    import TableDetailGlobal from './components/TableDetailGlobal.vue'
    import TrendGlobalDaily from "./components/TrendGlobalDaily";
    import SummaryTrendIndonesia from "./components/SummaryTrendIndonesia";

    export default {
        name: 'App',
        components: {
            HeaderSummary,
            TableDetailGlobal,
            TrendGlobalDaily,
            SummaryTrendIndonesia
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

    .container {

    }

    .card-body {
        /*display: flex;*/
        /*justify-content: center;*/
        /*align-items: center;*/
    }
</style>
