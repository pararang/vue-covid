<template>
    <div class="card-body" style="height: 428px;">
            <content-loader :is-loading="isLoading" @refresh-data="renderDataTrendGlobal">
                <template v-slot:content>
                    <GChart type="AreaChart" :data="chartData" :options="chartOptions" />
                    <!-- <p class="small">Pembaharuan terakhir: {{ lastUpdate }}</p> -->
                </template>
            </content-loader>
        </div>

</template>

<script>
    import {
        GChart
    } from 'vue-google-charts'
    import {
        APIServiceCovid
    } from '../../services/APIServiceCovid';
    import moment from 'moment';
    import ContentLoader from '@/components/ContentLoader';

    const apiService = new APIServiceCovid();
    export default {
        name: "TrendGlobalDaily",
        components: {
            GChart, ContentLoader
        },
        data() {
            return {
                isLoading: true,
                dataTrendMainlandChina: [],
                dataTrendOtherLocations: [],
                chartData: [],
                chartOptions: {
                    chart: {
                        title: 'Tren Global',
                    },
                    legend: {position: 'right'},
                    is3D: false,
                    isStacked: false,
                    aggregationTarget: 'series',
                    height: 350,
                    vAxis: {
                        // ticks: [0, 25000],
                        // gridlines: {multiple: 1000},
                        scaleType: 'liniear'
                    }
                },
            };
        },
        methods: {
            renderDataTrendGlobal() {
                this.isLoading = true
                this.chartData = [],
                apiService.getDataDailyGlobal()
                    .then((data) => {
                        this.chartData.push(['Tanggal', 'Global', 'China (Mainland)', 'Lokasi lainnya']);
                        // console.log(data.length);
                        let vAxisInterval = 20000;
                        let maxVAxis = 0;
                        // let ticks = [];
                        for (let [i, day] of data.entries()) {
                            let perDay = [
                                moment(day.reportDate).format('D/MM'),
                                day.mainlandChina + day.otherLocations,
                                day.mainlandChina,
                                day.otherLocations
                                ];
                            this.chartData.push(perDay);

                            //set v axis tick
                            if (perDay[1] > maxVAxis) {
                                maxVAxis = perDay[1];
                            }
                            let xAxisTickQuantity = Math.ceil(maxVAxis / vAxisInterval);
                            for (let j = 0; j < xAxisTickQuantity; j++) {
                                //TODO: vAxis not defined
                                // this.chartOptions.vAxis.ticks.push(j * vAxisInterval);
                            }
                        }
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