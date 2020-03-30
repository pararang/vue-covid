<template>
    <div id="app" class="container">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <Header></Header>
        <div class="card">
            <div class="card-header" id="chart-indonesia">Indonesia</div>
            <div class="card-body">
                <indonesia-dashboard />
                <b-tabs class="mt-4" active-nav-item-class="font-weight-bold btn" active-tab-class=""
                    content-class="mt-3" fill>
                    <b-tab title="Tren Perhari" active lazy>
                        <TrendIndonesiaDaily />
                    </b-tab>
                    <b-tab title="Provinsi" lazy>
                        <ProvinceChart />
                    </b-tab>
                </b-tabs>
            </div>
        </div>
        <div class="card">
            <div class="card-header" id="chart-global">Global</div>
            <div class="card-body">
                <SummaryGlobal /><br/>
                 <b-tabs active-nav-item-class="font-weight-bold btn" active-tab-class=""
                    content-class="mt-3" fill>
                    <b-tab title="Tren Perhari" active lazy>
                        <TrendGlobalDaily />
                    </b-tab>
                    <b-tab title="Cek Per Negara" lazy>
                        <CurrentPerCountry />
                    </b-tab>
                    <b-tab title="Data Terbanyak" lazy>
                        <DataGlobalGraph />
                    </b-tab>
                </b-tabs>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
    import Header from './components/header/Header';
    import SummaryGlobal from './components/global/Summary';
    import TrendIndonesiaDaily from './components/indonesia/Trend';
    import ProvinceChart from "./components/indonesia/Province";
    import IndonesiaDashboard from "./components/indonesia/Dashboard";
    import TrendGlobalDaily from "./components/global/TrendDaily";
    import CurrentPerCountry from './components/global/CurrentPerCountry';
    import DataGlobalGraph from "./components/global/DataGraph";
    import Footer from "./components/footer/Footer";

    const metaCard = 'https://covid19.mathdro.id/api/countries/Indonesia/og';

    export default {
        name: 'App',
        components: {
            Header,
            SummaryGlobal,
            TrendIndonesiaDaily,
            ProvinceChart,
            CurrentPerCountry,
            TrendGlobalDaily,
            DataGlobalGraph,
            Footer,
            IndonesiaDashboard
        },
        data() {
            return {
                isIndonesia: true,
                logo: 'https://covid19.mathdro.id/api/countries/Indonesia/og'
            }
        },
        metaInfo: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: 'Data Penyebaran Korona di Indonesia dan Dunia',
            // all titles will be injected into this template
            titleTemplate: '%s | Vue Covid',
            meta: [{
                    charset: 'utf-8'
                },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                },
                {
                    name: 'twitter:card',
                    content: 'summary'
                },
                {
                    name: 'twitter:title',
                    content: 'Data Penyebaran Korona di Indonesia dan Dunia'
                },
                {
                    name: 'twitter:description',
                    content: 'Visualisasi dan rangkuman data penyebaran korona (Covid 19) di Indonesia dan dunia mengunakan VueJS'
                },
                // image must be an absolute path
                {
                    name: 'twitter:image',
                    content: metaCard
                },
                // Facebook OpenGraph
                {
                    property: 'og:title',
                    content: 'Data Penyebaran Korona di Indonesia dan Dunia'
                },
                {
                    property: 'og:site_name',
                    content: 'Data Penyebaran Korona di Indonesia dan Dunia'
                },
                {
                    property: 'og:type',
                    content: 'website'
                },
                {
                    property: 'og:image',
                    content: metaCard
                },
                {
                    property: 'og:description',
                    content: 'Visualisasi dan rangkuman data penyebaran korona (Covid 19) di Indonesia dan dunia mengunakan VueJS'
                }
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
