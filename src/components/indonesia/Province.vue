<template>
    <div class="card">
        <div class="card-body" style="min-height: 662px;">
            <content-loader :is-loading="isLoading" @refresh-data="renderTrendIndonesia">
                <template v-slot:content>
                    <div style="text-align: left;">
                        <b-button @click="changeCategory('positive')" :variant="activeTab === 'positive'? 'success': 'outline-success'" pill>Positif</b-button>
                        <b-button @click="changeCategory('died')" :variant="activeTab === 'died'? 'success': 'outline-success'" class="ml-2" pill>Meninggal</b-button>
                        <b-button @click="changeCategory('recovery')" :variant="activeTab === 'recovery'? 'success': 'outline-success'" class="ml-2" pill>Sembuh</b-button>
                    </div>
                    <highcharts :options="chartOption"></highcharts>
                    <div>
                        <b-button @click="showAllProvince()" variant="outline-primary" pill>{{showTop10? 'Tampilkan semua provinsi': 'Tampilkan 10 provinsi'}}</b-button>
                    </div>
                </template>
            </content-loader>
        </div>
    </div>

</template>

<script>
    import {
        APIServiceCovidIndonesia
    } from '../../services/APIServiceCovidIndonesia';
    import {Chart} from 'highcharts-vue'
    import moment from 'moment';
    import ContentLoader from '@/components/ContentLoader';

    const apiServiceCovidIndonesia = new APIServiceCovidIndonesia();
    export default {
        name: "TrendGlobalDaily",
        components: {
            ContentLoader, highcharts: Chart
        },
        data() {
            return {
                isLoading: true,
                activeTab: 'positive',
                casePositive: [],
                caseDied: [],
                showTop10: true,
                caseRecovery: [],
                chartOption: {
                    chart: { type: 'bar', height: 1000 },
                    title: { style: {'display':  'none'}},
                    title: { style: {'display':  'none'}},
                    xAxis: { categories: [], allowDecimals: false},
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Kasus',
                            align: 'high'
                        },
                        labels: { overflow: 'justify' },
                        allowDecimals: false
                    },
                    tooltip: {
                        valueSuffix: ' Kasus'
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true,
                                // format: '{y}  <b>({percentage}%)</b>',
                                formatter: function() {
                                    return `${this.y} <span style="color: grey">(${this.percentage}%)</span>`;
                                },
                                inside: false,
                                useHTML: true
                            }
                        }
                    },
                    legend: {enabled: false},
                    credits: { enabled: false },
                    series: [{ name: '', data: [] }]
                }
            }
        },
        methods: {
            renderTrendIndonesia() {
                this.isLoading = true
                apiServiceCovidIndonesia.fetchDataPerProvince()
                    .then((response) => {
                        // Copy array
                        this.casePositive = [...response.data.data]
                        this.caseDied = [...response.data.data]
                        this.caseRecovery = [...response.data.data]

                        // Order data by descending
                        this.casePositive.sort((a, b) => {
                            if (a.kasusPosi < b.kasusPosi) return 1;
                            if (a.kasusPosi > b.kasusPosi) return -1;
                            // else {
                                if (a.provinsi > b.provinsi) return 1;
                                if (a.provinsi < b.provinsi) return -1;
                            // }
                        })
                        this.caseDied.sort((a, b) => b.kasusMeni - a.kasusMeni)
                        this.caseRecovery.sort((a, b) => b.kasusSemb - a.kasusSemb)

                        this.changeCategory('positive')
                    })
                    .catch(error => {console.error(error)})
                    .finally(error => { this.isLoading = false })
            },
            changeCategory(activeTab) {
                this.activeTab = activeTab
                let categories = []
                let dataSeries = []
                let nameSeries = 'Sembuh'
                let chartHeight = 1000
                let total = 0

                switch (this.activeTab) {
                    case 'positive':
                        total = this.casePositive.reduce(function (acc, obj) { return acc + obj.kasusPosi; }, 0);
                        nameSeries = 'Positif'
                        categories = this.casePositive.map(item => { return item.provinsi })
                        dataSeries = this.casePositive.map(item => {
                            return {name: item.provinsi, y: item.kasusPosi, percentage: (item.kasusPosi/total * 100).toFixed(2)}
                        })

                        console.log({dataSeries})
                        break;
                    case 'died':
                        total = this.casePositive.reduce(function (acc, obj) { return acc + obj.kasusMeni; }, 0);
                        nameSeries = 'Meningggal'
                        categories = this.caseDied.map(item => { return item.provinsi })
                        dataSeries = this.caseDied.map(item => {
                            return {name: item.provinsi, y: item.kasusMeni, percentage: (item.kasusMeni/total * 100).toFixed(2)}
                        })
                        break;
                    default:
                        total = this.casePositive.reduce(function (acc, obj) { return acc + obj.kasusSemb; }, 0);
                        categories = this.caseRecovery.map(item => { return item.provinsi })
                        dataSeries = this.caseRecovery.map(item => {
                            return {name: item.provinsi, y: item.kasusSemb, percentage: (item.kasusSemb/total * 100).toFixed(2)}
                        })
                        break;
                }

                if (this.showTop10) {
                    chartHeight = 500
                    categories = categories.slice(0, 10)
                    dataSeries = dataSeries.slice(0, 10)
                }

                this.chartOption.chart.height = chartHeight
                this.chartOption.xAxis.categories = categories
                this.chartOption.series = [{name: nameSeries, data: dataSeries}]
            },
            showAllProvince() {
                this.showTop10 = !this.showTop10
                this.changeCategory(this.activeTab)
            }
        },
        mounted() {
            this.renderTrendIndonesia();
            this.$parent.$on('click', this.renderTrendIndonesia);
        },
    }
</script>

<style scoped>

</style>
