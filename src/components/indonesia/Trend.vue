<template>
    <div class="card">
        <div class="card-body" style="height: 428px;">
            <content-loader :is-loading="isLoading" @refresh-data="renderTrendIndonesia">
                <template v-slot:content>
                    <GChart type="AreaChart" :data="chartData" :options="chartOptions" />
                </template>
            </content-loader>
        </div>
    </div>

</template>

<script>
    import {
        GChart
    } from 'vue-google-charts'
    import {
        APIServiceCovidIndonesia
    } from '../../services/APIServiceCovidIndonesia';
    import moment from 'moment';
    import ContentLoader from '@/components/ContentLoader';

    const apiServiceCovidIndonesia = new APIServiceCovidIndonesia();
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
                        title: 'Tren Indonesia',
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
            renderTrendIndonesia() {
                this.isLoading = true
                this.chartData = [],
                    apiServiceCovidIndonesia.fetchDataDaily()
                        .then((data) => {
                            this.chartData.push(['Tanggal', 'Terinfeksi', 'Meninggal', 'Sembuh']);
                            let days = data.data.data;
                            let vAxisInterval = 20000;
                            let maxVAxis = 0;
                            // let ticks = [];
                            for (let [i, day] of days.entries()) {
                                let perDay = [
                                    moment(day.tanggal).format('D/MM'),
                                    day.jumlahKasusKumulatif,
                                    day.jumlahPasienMeninggal,
                                    day.jumlahPasienSembuh
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
            this.renderTrendIndonesia();
            this.$parent.$on('click', this.renderTrendIndonesia);
        },
    }
</script>

<style scoped>

</style>
