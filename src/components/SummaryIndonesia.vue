<template>
    <div class="card">
        <div class="card-header">Summary Indonesia</div>
        <div class="card-body">
            <GChart
                    type="BarChart"
                    :data="chartData"
                    :options="chartOptions"
            />
            <p class="small">Terakhir diperbaharui: {{ lastUpdate }}</p>
        </div>
    </div>
</template>

<script>
    import { GChart } from 'vue-google-charts'
    import {
        APIServiceCovid
    } from '../APIServiceCovid';
    import moment from 'moment';


    const apiService = new APIServiceCovid();


    export default {
        name: "SummaryIndonesia",
        components: {
            GChart
        },
        data () {
            return {
                countryCodeIndonesia: 'ID',
                lastUpdate: '',
                chartData: [],
                chartOptions: {
                    chart: {
                        title: 'Total di Indonesia',
                    },
                    legend: {position: 'none'},
                    // is3D: true,
                },
                chartEvents: {
                    'select': () => {
                    }
                }
            }
        },
        methods: {
            renderChartData() {
                apiService.getDataSummaryPerCountry(this.countryCodeIndonesia).then((data) => {
                    this.chartData.push(['Element', 'Jumlah Pasien', { role: 'style' }]);

                    let chartElementRecovered = ['Pulih', data.recovered.value, '#0eff00'];
                    this.chartData.push(chartElementRecovered);

                    let chartElementDeaths = ['Meninggal', data.deaths.value, '#ff0000'];
                    this.chartData.push(chartElementDeaths);

                    let chartElementConfirmed = ['Terinfeksi', data.confirmed.value, '#ffe100'];
                    this.chartData.push(chartElementConfirmed);

                    this.lastUpdate = moment(data.lastUpdate).format('DD/MM/YYYY HH:mm:ss ZZ');
                });
            },
        },

        mounted() {
            console.log(this.chartData);
            this.renderChartData();
            console.log(this.chartData);
        },
    }
</script>

<style scoped>

</style>