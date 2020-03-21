<template>
    <div class="card">
        <div class="card-header">{{ countryName }}</div>
        <div class="card-body" style="height: 313px;">
            <content-loader :is-loading="isLoading" @refresh-data="renderChartData">
                <template v-slot:content>
                    <GChart
                        type="BarChart"
                        :data="chartData"
                        :options="chartOptions" />
                    <b-form-select v-model="countryCodeSelected" :options="countryCodeOptions" @change="countryselected"></b-form-select>
                    <p class="small">Pembaharuan terakhir: {{ lastUpdate }}</p>
                </template>
            </content-loader>
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
    import ContentLoader from '@/components/ContentLoader';


    const apiServiceCovid = new APIServiceCovid();
    const apiServiceCovidJakarta = new APIServiceCovidJakarta();

    const getDate = (dateValue) => moment(dateValue).format('D-MMM-YYYY');
    const getTime = (dateValue) => moment(dateValue).format('HH:mm:ss');
    const getTimezone = (dateValue) => moment(dateValue).format("ZZ")
    const getDatetime = (dateValue) => {
        const timezone = getTimezone(dateValue) === '+0700'? 'WIB': getTimezone(dateValue)
        return getDate(dateValue) + ' | ' + getTime(dateValue) + ' ' + timezone
    }

    export default {
        name: "SummaryIndonesia",
        components: {
            GChart, ContentLoader
        },
        data () {
            return {
                countryCodeIndonesia: 'ID',
                countryCodeSelected: null,
                countryCodeOptions: [],
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
                },
                isLoading: true
            }
        },
        computed: {
            countryName () {
                if (this.countryCodeSelected == null)
                    return ""
                let datum = this.countryCodeOptions.find(item => item.value === this.countryCodeSelected);
                return datum.text;
            }
        },
        methods: {
            countryselected(countrySelected) {
                this.countryCodeSelected = countrySelected
                this.renderChartData()
            },
            renderChartData() {
                this.isLoading = true
                this.chartData = []
                apiServiceCovid.getDataSummaryPerCountry(this.countryCodeSelected)
                    .then((data) => {
                        //TODO if one of the value is 0 use value from api jakarta
                        if (data.recovered.value == 0 || data.deaths.value == 0 || data.confirmed.value == 0) {
                            this.renderNationalChartData();
                        } else {
                            this.chartData.push(['Element', 'Jumlah Pasien', { role: 'style' }, { role: 'annotation' }]);
                            this.chartData.push(['Pulih', data.recovered.value, '#0eff00', data.recovered.value > 0 ? data.recovered.value : 'Data sedang diperbaharui']);
                            this.chartData.push(['Meninggal', data.deaths.value, '#ff0000', data.deaths.value > 0 ? data.deaths.value : 'Data sedang diperbaharui']);
                            this.chartData.push(['Terinfeksi', data.confirmed.value, '#ffe100', data.confirmed.value > 0 ? data.confirmed.value : 'Data sedang diperbaharui']);
                            this.lastUpdate = getDatetime(data.lastUpdate)
                        }
                    })
                    .catch(error => {console.error(error)})
                    .finally(() => {this.isLoading = false})
            },
            renderNationalChartData() {
                this.isLoading = true
                apiServiceCovidJakarta.fetchData()
                    .then((data) => {
                        let nationalData = data.data.nasional;
                        this.chartData.push(['Element', 'Jumlah Pasien', { role: 'style' }, { role: 'annotation' }]);
                        this.chartData.push(['Pulih', nationalData.sembuh, '#0eff00', nationalData.sembuh > 0 ? nationalData.sembuh : 'Data sedang diperbaharui']);
                        this.chartData.push(['Meninggal', nationalData.meninggal, '#ff0000', nationalData.meninggal > 0 ? nationalData.meninggal : 'Data sedang diperbaharui']);
                        this.chartData.push(['Terinfeksi', nationalData.positif, '#ffe100', nationalData.positif > 0 ? nationalData.positif : 'Data sedang diperbaharui']);
                        this.lastUpdate = getDatetime(data.lastUpdate)
                    })
                    .catch(error => {console.error(error)})
                    .finally(() => {this.isLoading = false})
            }
        },

        mounted() {
            this.renderChartData();
        },
    }
</script>
