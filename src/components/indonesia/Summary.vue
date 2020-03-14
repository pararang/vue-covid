<template>
    <div class="card">
        <div class="card-header">Indonesia</div>
        <div class="card-body">
            <GChart
                    type="BarChart"
                    :data="chartData"
                    :options="chartOptions"
            />
            <p class="small">Pembaharuan terakhir: {{ lastUpdate }}</p>
        </div>
    </div>
</template>

<script>
    import { GChart } from 'vue-google-charts'
    import {
        APIServiceCovid
    } from '../../services/APIServiceCovid';
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
                    this.chartData.push(['Element', 'Jumlah Pasien', { role: 'style' }, { role: 'annotation' }]);
                    this.chartData.push(['Pulih', data.recovered.value, '#0eff00', data.recovered.value]);
                    this.chartData.push(['Meninggal', data.deaths.value, '#ff0000', data.deaths.value]);
                    this.chartData.push(['Terinfeksi', data.confirmed.value, '#ffe100', data.confirmed.value]);
                    this.lastUpdate = moment(data.lastUpdate).format('DD/MM/YYYY HH:mm:ss ZZ');
                });
            },
        },

        mounted() {
            this.renderChartData();
        },
    }
</script>

<style scoped>

</style>