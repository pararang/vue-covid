<template>
    <content-loader :is-loading="isLoading" @refresh-data="renderChartData">
        <template v-slot:content>
            <div class="container" style="min-height: 202px;">
                <div class="row text-left row mx-lg-n4 mx-n4">
                    <div class="col-sm-3 px-lg-2 mb-3">
                        <div class="card statistics case__positive ">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-4">
                                        <fai size="3x" icon="frown-open"/>
                                    </div>
                                    <div class="col-8 total-case text-right">
                                        {{confirmed | separator}}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-8 case-category">
                                        positif
                                    </div>
                                    <div class="col-4 text-right">
                                        <b-badge variant="light">{{getPercentage(confirmed)}} %</b-badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3 px-lg-2 mb-3">
                        <div class="card statistics case__died">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-4">
                                        <fai size="3x" icon="dizzy"/>
                                    </div>
                                    <div class="col-8 total-case text-right">
                                        {{death | separator}}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-8 case-category">
                                        meninggal
                                    </div>
                                    <div class="col-4 text-right">
                                        <b-badge variant="light">{{getPercentage(death)}} %</b-badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3 px-lg-2 mb-3">
                        <div class="card statistics case__recovery">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-4">
                                        <fai size="3x" icon="grin"/>
                                    </div>
                                    <div class="col-8 total-case text-right">
                                        {{recovered | separator}}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-8 case-category">
                                        sembuh
                                    </div>
                                    <div class="col-4 text-right">
                                        <b-badge variant="light">{{getPercentage(recovered)}} %</b-badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3 px-lg-2">
                        <div class="card statistics case__treatment ">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-4">
                                        <fai size="3x" icon="meh"/>
                                    </div>
                                    <div class="col-8 total-case text-right">
                                        {{treatment | separator}}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-8 case-category">
                                        dalam perawatan
                                    </div>
                                    <div class="col-4 text-right">
                                        <b-badge variant="light">{{getPercentage(treatment)}} %</b-badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="note text-left mx-lg-n4 mx-n2">
                Pembaharuan terakhir: {{lastUpdate}}<br>
                <b>Catatan:</b> Tanda "-" menandakan bahwa data tidak ditemukan atau sedang diperbaharui
                </div>
            </div>
        </template>
    </content-loader>
</template>

<script>
    import { APIServiceCovid } from '../../services/APIServiceCovid';
    import { APIServiceCovidIndonesia } from '../../services/APIServiceCovidIndonesia';
    import moment from 'moment';
    import ContentLoader from '@/components/ContentLoader';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faDizzy, faFrownOpen, faGrin, faMeh } from '@fortawesome/free-solid-svg-icons'
    library.add(faDizzy, faFrownOpen, faGrin, faMeh)

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
            ContentLoader, fai: FontAwesomeIcon
        },
        data() {
            return {
                countryCodeIndonesia: 'IDN',
                annotationOnNoData: '-',
                lastUpdate: '',
                chartData: [],
                isLoading: true,
                confirmed: '-',
                recovered: '-',
                death: '-',
                treatment: '-'
            }
        },
        filters: {
            separator: function (value) {
                if (!value) return ''
                var formattedValue = ''
                value = value.toString().split('').reverse().join('')
                for(var i = 0; i < value.length; i++) if(i%3 == 0) formattedValue += value.substr(i,3)+','
                return formattedValue.split('',formattedValue.length-1).reverse().join('')
            }
        },
        methods: {
            getPercentage(a){
                if (a === '-' || this.confirmed === '-') return '-'
                return ((a / this.confirmed) * 100).toFixed(1)
            },
            renderChartData() {
                this.isLoading = true
                this.chartData = []
                apiServiceCovid.getDataSummaryPerCountry(this.countryCodeIndonesia)
                    .then((data) => {
                        //if API Covid is corrupted and selected country is Indonesia, fetch data from API Indonesia
                        if (data.recovered.value == 0 || data.deaths.value == 0 || data.confirmed.value == 0) {
                            this.renderNationalChartData();
                        } else {
                            this.recovered = (data.recovered.value).toLocaleString('id-ID') || this.annotationOnNoData
                            this.death = data.deaths.value || this.annotationOnNoData
                            this.confirmed = data.confirmed.value || this.annotationOnNoData
                            this.lastUpdate = getDatetime(data.lastUpdate)
                            this.setTreatmentCase()
                        }
                    })
                    .catch(error => { console.error(error) })
                    .finally(() => { this.isLoading = false })
            },
            setTreatmentCase() {
                if ([this.recovered, this.death, this.confirmed].includes(this.annotationOnNoData)) {
                    this.treatment = this.annotationOnNoData
                } else this.treatment = this.confirmed - this.recovered - this.death
            },
            renderNationalChartData() {
                this.isLoading = true
                apiServiceCovidIndonesia.index()
                    .then((data) => {
                        let aggregate = data.data;
                        this.recovered = aggregate.sembuh || this.annotationOnNoData
                        this.death = aggregate.meninggal || this.annotationOnNoData
                        this.confirmed = aggregate.jumlahKasus || this.annotationOnNoData
                        this.lastUpdate = getDatetime(aggregate.lastUpdate)
                        this.setTreatmentCase()
                    })
                    .catch(error => { console.error(error) })
                    .finally(() => { this.isLoading = false })
            }
        },
        mounted() { this.renderChartData() },
    }
</script>

<style scoped>
    .card { display: block;}
    .statistics {
        margin-top: 0;
        margin-bottom: 0;
    }
    .total-case {
        font-size: 2.5rem;
    }
    .case-category {
        font-size: 1rem;
        font-weight: bold;
        margin-top: 24px;
    }
    .case__positive {
        color: #ffc107;
        background: #ffc107;
        color: #fff;
        border-color: #ffc107;
    }
    .case__died {
        color: #dc3545;
        background: #dc3545;
        color: #fff;
        border-color: #dc3545;
    }
    .case__recovery {
        color: #28a745;
        background: #28a745;
        color: #fff;
        border-color: #28a745;
    }
    .case__treatment {
        color: #6c757d;
        background: #6c757d;
        color: #fff;
        border-color: #6c757d;
    }
    .note {
        color: #666666;
        font-size: 12px;
        font-style: italic;
    }

    /* Scrolling */
    .horizontal-scroll {
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
    }
    .horizontal-scroll:only-child {
        display: inline-block;
    }
    .horizontal-scroll {
        width: 100%;
        -webkit-overflow-scrolling: touch;
    }
    /* End of Scrolling */

    /* Hide Scrolling */
    .hide-scroll::-webkit-scrollbar{
        display: none; /** Chrome */
        -webkit-appearance: none; /** Safari */
    }
    .hide-scroll { scrollbar-width: none; } /** Firefox */
    /* End of Hide Scrolling */
</style>
