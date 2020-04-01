<template>
    <div class="card">
        <div class="card-body" style="height: auto;">
            <content-loader :is-loading="isLoading" @refresh-data="renderTrendIndonesia">
                <template v-slot:content>
                    <highcharts :options="chartOption"></highcharts>
                </template>
            </content-loader>
        </div>
    </div>
</template>

<script>
    import {APIServiceCovidIndonesia} from '../../services/APIServiceCovidIndonesia';
    import {Chart} from 'highcharts-vue'
    import ContentLoader from '@/components/ContentLoader';
    import moment from "moment";

    const apiServiceCovidIndonesia = new APIServiceCovidIndonesia();
    export default {
        name: "TrendIndonesiaDaily",
        components: {
            ContentLoader, highcharts: Chart
        },
        data() {
            return {
                isLoading: true,
                chartOption: {
                    chart: {
                        type: 'areaspline'
                    },
                    title: {
                        text: ''
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'left',
                        verticalAlign: 'top',
                        x: 150,
                        y: 100,
                        floating: true,
                        borderWidth: 1,
                    },
                    xAxis: {
                        categories: [],
                        title: {
                            text: 'Waktu (Tanggal/Bulan)'
                        },
                        tickInterval: 3
                    },
                    yAxis: {
                        title: {
                            text: 'Jumlah Kasus'
                        }
                    },
                    tooltip: {
                        shared: true,
                        valueSuffix: ' orang'
                    },
                    plotOptions: {
                        areaspline: {
                            fillOpacity: 0.5
                        }
                    },
                    credits: {
                        // enabled: false,
                        text: 'Sumber data.',
                        href: '#'
                    },
                    series: [] // array of object {name: 'John', data: [3, 4, 3, 5, 4, 10, 12]}
                }
            }
        },
        methods: {
            renderTrendIndonesia() {
                this.isLoading = true;
                this.chartOption.credits.href = apiServiceCovidIndonesia.getBaseUrl();
                this.chartOption.xAxis.categories = this.chartOption.series = [];
                apiServiceCovidIndonesia.fetchDataDaily()
                    .then((data) => {
                        let days = data.data.data;
                        let dates = [];
                        let dataConfirmed = [];
                        let dataDeaths = [];
                        let dataRecovery = [];
                        let countData = days.length;
                        let tickInterval = Math.floor((countData / 60) * this.chartOption.xAxis.tickInterval);
                        for (let [i, day] of days.entries()) {
                            dates.push(moment(day.tanggal).format('D/MM'));
                            dataConfirmed.push(day.jumlahKasusKumulatif);
                            dataDeaths.push(day.jumlahPasienMeninggal);
                            dataRecovery.push(day.jumlahPasienSembuh);
                        }
                        this.chartOption.xAxis.categories = dates;
                        this.chartOption.xAxis.tickInterval = tickInterval;
                        this.chartOption.series.push({name: 'Positif', data: dataConfirmed});
                        this.chartOption.series.push({name: 'Meninggal', data: dataDeaths});
                        this.chartOption.series.push({name: 'Sembuh', data: dataRecovery});
                    })
                    .catch(error => {console.error(error)})
                    .finally(error => { this.isLoading = false })
            },
        },
        mounted() {
            this.renderTrendIndonesia();
        },
    }
</script>

<style scoped>

</style>
