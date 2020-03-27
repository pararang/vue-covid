<template>
    <div>
        <div class="align-item-center">
            <b-form-select v-model="countryCodeSelected" :options="countryCodeOptions" @change="countryselected" class="btn btn-light text-center" style="text-align-last: center; background-color: rgba(0, 0, 0, 0.03);">
            </b-form-select>
        </div>
        <div class="card-body" style="height: 313px;">
            <content-loader :is-loading="isLoading" @refresh-data="renderChartData">
                <template v-slot:content>
                    <GChart type="BarChart" :data="chartData" :options="chartOptions" />
                    <p class="small">Pembaharuan terakhir: {{ lastUpdate }}</p>
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
        APIServiceCovid
    } from '../../services/APIServiceCovid';
    import {
        APIServiceCovidIndonesia
    } from '../../services/APIServiceCovidIndonesia';
    import moment from 'moment';
    import ContentLoader from '@/components/ContentLoader';


    const apiServiceCovid = new APIServiceCovid();
    const apiServiceCovidIndonesia = new APIServiceCovidIndonesia();

    const getDate = (dateValue) => moment(dateValue).format('D-MMM-YYYY');
    const getTime = (dateValue) => moment(dateValue).format('HH:mm:ss');
    const getTimezone = (dateValue) => moment(dateValue).format("ZZ")
    const getDatetime = (dateValue) => {
        const timezone = getTimezone(dateValue) === '+0700' ? 'WIB' : getTimezone(dateValue)
        return getDate(dateValue) + ' | ' + getTime(dateValue) + ' ' + timezone
    }

    export default {
        name: "SummaryIndonesia",
        components: {
            GChart,
            ContentLoader
        },
        data() {
            return {
                countryCodeIndonesia: 'IDN',
                annotationOnNoData: 'Data tidak ditemukan atau sedang diperbaharui',
                countryCodeSelected: null,
                countryCodeOptions: [],
                lastUpdate: '',
                chartData: [],
                chartOptions: {
                    chart: {
                        title: 'Total di Indonesia',
                    },
                    legend: {
                        position: 'none'
                    },
                    // is3D: true,
                },
                chartEvents: {
                    'select': () => {}
                },
                isLoading: true
            }
        },
        computed: {
            countryName() {
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
                this.$emit('countryselected', this.countryCodeSelected)
            },
            fetchCountryData() {
                this.isLoading = true
                this.countryCodeOptions = []
                apiServiceCovid.getDataCountryCode()
                    .then((data) => {
                        let countries = []
                        data.countries.forEach(function (val) {
                            countries.push({
                                value: val.iso3,
                                text: val.name
                            })
                        })
                        this.countryCodeOptions = countries
                        this.countryCodeSelected = this.countryCodeIndonesia
                    })
                    .then(() => {
                        this.renderChartData()
                    })
                    .catch(error => {
                        console.error(error)
                    })
                    .finally(() => {
                        this.isLoading = false
                    })
            },
            renderChartData() {
                this.isLoading = true
                this.chartData = []
                apiServiceCovid.getDataSummaryPerCountry(this.countryCodeSelected)
                    .then((data) => {
                        //if API Covid is corrupted and selected country is Indonesia, fetch data from API Indonesia
                        if ((data.recovered.value == 0 || data.deaths.value == 0 || data.confirmed.value == 0) &&
                            this.countryCodeSelected == this.countryCodeIndonesia) {
                            this.renderNationalChartData();
                        } else {
                            this.chartData.push(['Element', 'Jumlah Pasien', {
                                role: 'style'
                            }, {
                                role: 'annotation'
                            }]);
                            this.chartData.push(['Pulih', data.recovered.value, '#0eff00', data.recovered.value >
                                0 ? data.recovered.value : this.annotationOnNoData
                            ]);
                            this.chartData.push(['Meninggal', data.deaths.value, '#ff0000', data.deaths.value > 0 ?
                                data.deaths.value : this.annotationOnNoData
                            ]);
                            this.chartData.push(['Terinfeksi', data.confirmed.value, '#ffe100', data.confirmed
                                .value > 0 ? data.confirmed.value : this.annotationOnNoData
                            ]);
                            this.lastUpdate = getDatetime(data.lastUpdate)
                        }
                    })
                    .catch(error => {
                        console.error(error)
                    })
                    .finally(() => {
                        this.isLoading = false
                    })
            },
            renderNationalChartData() {
                this.isLoading = true
                apiServiceCovidIndonesia.index()
                    .then((data) => {
                        let aggregate = data.data;
                        this.chartData.push(['Element', 'Jumlah Pasien', {
                            role: 'style'
                        }, {
                            role: 'annotation'
                        }]);
                        this.chartData.push(['Pulih', aggregate.sembuh, '#0eff00', aggregate.sembuh > 0 ? aggregate.sembuh : this
                            .annotationOnNoData
                        ]);
                        this.chartData.push(['Meninggal', aggregate.meninggal, '#ff0000', aggregate.meninggal > 0 ? aggregate
                            .meninggal : this.annotationOnNoData
                        ]);
                        this.chartData.push(['Terinfeksi', aggregate.jumlahKasus, '#ffe100', aggregate.jumlahKasus > 0 ? aggregate
                            .jumlahKasus : this.annotationOnNoData
                        ]);
                        this.lastUpdate = getDatetime(aggregate.lastUpdate)
                    })
                    .catch(error => {
                        console.error(error)
                    })
                    .finally(() => {
                        this.isLoading = false
                    })
            }
        },

        mounted() {
            this.fetchCountryData();
        },
    }
</script>

<style scoped>
    btn-light {
        background-color: rgba(0, 0, 0, 0.03);
        font-weight: bold;
    }

</style>
