<template>
    <div class="card">
        <div class="card-header">
            Tren Kasus Global
        </div>
<!--        <div class="card-body">-->
<!--                    <trend-->
<!--                            :data="dataTrendMainlandChina"-->
<!--                            :gradient="['#6fa8dc', '#42b983', '#2c3e50']"-->
<!--                            auto-draw-->
<!--                            smooth-->
<!--                    >-->
<!--                    </trend>-->
<!--                    <trend-->
<!--                            :data="dataTrendOtherLocations"-->
<!--                            :gradient="['#ff0000', '#fffe00', '#00ff1a']"-->
<!--                            auto-draw-->
<!--                            smooth-->
<!--                    ></trend>-->
<!--        </div>-->
        <div class="card-body">
            <div id="chart">
                <apexchart height="350" :options="chartOptions" :series="series"></apexchart>
            </div>
        </div>

    </div>

</template>

<script>
    import {
        APIServiceCovid
    } from '../../services/APIServiceCovid';
    import VueApexCharts from 'vue-apexcharts'
    import moment from 'moment'

    const apiService = new APIServiceCovid();
    export default {
        name: "TrendGlobalDaily",
        components: {
            apexchart: VueApexCharts,
        },
        data() {
            return {
                dataTrendMainlandChina: [],
                dataTrendOtherLocations: [],
                xAxisDate: [],
                series: [{
                    name: 'Mainland China',
                    data: []
                }, {
                    name: 'Other locations',
                    data: []
                }],
                chartOptions: {
                    chart: {
                        height: 350,
                        type: 'area'
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'smooth'
                    },
                    xaxis: {
                        type: 'datetime',
                        categories: [] //2020-01-27T12:00:00+07:00
                    },
                    tooltip: {
                        x: {
                            format: 'dd/MM/yy',
                        }
                    },
                },
            };
        },
        methods: {
            getDataTrendGlobal() {
                const listTotalMainlandChina = [];
                const listTotalOtherLocations = [];
                const listAxisDateX = [];
                apiService.getDataDailyGlobal().then((data) => {
                    data.forEach(function (day) {
                        listTotalMainlandChina.push(day.mainlandChina);
                        listTotalOtherLocations.push(day.otherLocations);
                        let dateReport = moment(day.reportDate).toISOString();
                        listAxisDateX.push(dateReport)
                    });
                });
                this.dataTrendMainlandChina = listTotalMainlandChina;
                this.dataTrendOtherLocations = listTotalOtherLocations;
                this.xAxisDate = listAxisDateX;

                this.chartOptions.xaxis.categories = listAxisDateX;
                this.series[0].data = listTotalMainlandChina;
                this.series[1].data = listTotalOtherLocations;
            },
        },
        mounted() {
            this.getDataTrendGlobal();
        },
    }
</script>

<style scoped>

</style>