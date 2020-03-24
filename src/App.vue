<template>
    <div id="app" class="container">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <SummaryGlobal/>
        <div class="card">
            <div class="card-header">Indonesia</div>
            <div class="card-body">
                <b-tabs content-class="mt-3">
                    <b-tab title="Total Terkini" active><SummaryIndonesia/></b-tab>
                    <b-tab title="Tren Perhari"><TrendIndonesiaDaily/></b-tab>
                    <b-tab title="Work in progress!" disabled><p>Work in proggress!</p></b-tab>
                </b-tabs>
                <DataTableIndonesia/>
            </div>
        </div>
        <TrendGlobalDaily/>
        <Footer/>
    </div>
</template>

<script>
    import SummaryGlobal from './components/global/Summary';
    import TrendIndonesiaDaily from './components/indonesia/Trend';
    import SummaryIndonesia from "./components/indonesia/Summary";
    import DataTableIndonesia from "./components/indonesia/DataTable";
    import TrendGlobalDaily from "./components/global/TrendDaily";
    import Footer from "./components/footer/Footer";

    const metaCard = 'https://covid19.mathdro.id/api/countries/Indonesia/og';

    export default {
        name: 'App',
        components: {
            SummaryGlobal,
            TrendIndonesiaDaily,
            SummaryIndonesia,
            DataTableIndonesia,
            TrendGlobalDaily,
            Footer
        },
        data() {
            return {
                logo: 'https://covid19.mathdro.id/api/countries/Indonesia/og'
            }
        },
        metaInfo: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: 'Data Penyebaran Korona di Indonesia dan Dunia',
            // all titles will be injected into this template
            titleTemplate: '%s | Vue Covid',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                {name: 'twitter:card', content: 'summary'},
                {name: 'twitter:title', content: 'Data Penyebaran Korona di Indonesia dan Dunia'},
                {name: 'twitter:description', content: 'Visualisasi dan rangkuman data penyebaran korona (Covid 19) di Indonesia dan dunia mengunakan VueJS'},
                // image must be an absolute path
                {name: 'twitter:image', content: metaCard},
                // Facebook OpenGraph
                {property: 'og:title', content: 'Data Penyebaran Korona di Indonesia dan Dunia'},
                {property: 'og:site_name', content: 'Data Penyebaran Korona di Indonesia dan Dunia'},
                {property: 'og:type', content: 'website'},
                {property: 'og:image', content:  metaCard},
                {property: 'og:description', content: 'Visualisasi dan rangkuman data penyebaran korona (Covid 19) di Indonesia dan dunia mengunakan VueJS'}
            ]
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
</style>
