<template>
    <div class="card">
        <div class="card-body" style="height: auto;">
            <content-loader :is-loading="isLoading" @refresh-data="renderDataTrendGlobal">
                <template v-slot:content>
                    <highcharts :options="chartOption"></highcharts>
                </template>
            </content-loader>
        </div>
    </div>
</template>

<script>
    import {Chart} from 'highcharts-vue';
    import {APIServiceCovid} from '../../services/APIServiceCovid';
    import moment from 'moment';
    import ContentLoader from '@/components/ContentLoader';

    const apiService = new APIServiceCovid();
    export default {
        name: "TrendGlobalDaily",
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
            };
        },
        methods: {
            renderDataTrendGlobal() {
                this.isLoading = true;
                this.chartOption.credits.href = apiService.getBaseUrl();
                this.chartOption.xAxis.categories = this.chartOption.series = [];
                apiService.getDataDailyGlobal()
                    .then((data) => {
                        let dates = [];
                        let dataGlobal = [];
                        let dataMainlandChina = [];
                        let dataOtherLocations = [];
                        let countData = data.length;
                        let tickInterval = Math.floor((countData / 60) * this.chartOption.xAxis.tickInterval);
                        for (let [i, day] of data.entries()) {
                            dates.push(moment(day.reportDate).format('D/MM'));
                            dataGlobal.push(day.mainlandChina + day.otherLocations);
                            dataMainlandChina.push(day.mainlandChina);
                            dataOtherLocations.push(day.otherLocations);
                        }
                        this.chartOption.xAxis.categories = dates;
                        this.chartOption.xAxis.tickInterval = tickInterval;
                        this.chartOption.series.push({name: 'Global', data: dataGlobal});
                        this.chartOption.series.push({name: 'China (Mainland)', data: dataMainlandChina});
                        this.chartOption.series.push({name: 'Lokasi lainnya', data: dataOtherLocations});
                    })
                    .catch(error => {console.error(error)})
                    .finally(error => { this.isLoading = false })
            },
        },
        mounted() {
            this.renderDataTrendGlobal();
        },
    }
</script>

<style scoped>

</style>