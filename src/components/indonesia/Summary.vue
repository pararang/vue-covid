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
    import {
        APIServiceCovidJakarta
    } from '../../services/APIServiceCovidJakarta';
    import moment from 'moment';


    const apiServiceCovid = new APIServiceCovid();
    const apiServiceCovidJakarta = new APIServiceCovidJakarta();


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
                apiServiceCovid.getDataSummaryPerCountry(this.countryCodeIndonesia).then((data) => {
                    //TODO if one of the value is 0 use value from api jakarta
                    if (data.recovered.value == 0 || data.deaths.value == 0 || data.confirmed.value == 0) {
                        this.renderNationalChartData();
                    } else {
                        this.chartData.push(['Element', 'Jumlah Pasien', { role: 'style' }, { role: 'annotation' }]);
                        this.chartData.push(['Pulih', data.recovered.value, '#0eff00', data.recovered.value > 0 ? data.recovered.value : 'Data sedang diperbaharui']);
                        this.chartData.push(['Meninggal', data.deaths.value, '#ff0000', data.deaths.value > 0 ? data.deaths.value : 'Data sedang diperbaharui']);
                        this.chartData.push(['Terinfeksi', data.confirmed.value, '#ffe100', data.confirmed.value > 0 ? data.confirmed.value : 'Data sedang diperbaharui']);
                        this.lastUpdate = moment(data.lastUpdate).format('DD/MM/YYYY HH:mm:ss ZZ');
                    }

                });
            },
            renderNationalChartData() {
                apiServiceCovidJakarta.fetchData().then((data) => {
                    let nationalData = data.data.nasional;
                    this.chartData.push(['Element', 'Jumlah Pasien', { role: 'style' }, { role: 'annotation' }]);
                    this.chartData.push(['Pulih', nationalData.sembuh, '#0eff00', nationalData.sembuh > 0 ? nationalData.sembuh : 'Data sedang diperbaharui']);
                    this.chartData.push(['Meninggal', nationalData.meninggal, '#ff0000', nationalData.meninggal > 0 ? nationalData.meninggal : 'Data sedang diperbaharui']);
                    this.chartData.push(['Terinfeksi', nationalData.positif, '#ffe100', nationalData.positif > 0 ? nationalData.positif : 'Data sedang diperbaharui']);
                    this.lastUpdate = moment(data.lastUpdate).format('DD/MM/YYYY HH:mm:ss ZZ');
                });
            }
        },

        mounted() {
            this.renderChartData();
        },
    }
</script>

<style scoped>

</style>