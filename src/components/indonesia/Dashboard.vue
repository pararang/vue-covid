<template>
    <div class="mb-1 horizontal-scroll hide-scroll text-left">
        <div class="card statistics mr-3 case__positive">
            <div class="card-body">
                <div class="row">
                    <div class="col-6">
                        <fai size="3x" icon="frown-open"/>
                    </div>
                    <div class="col-6 total-case text-right">
                        {{confirmed}}
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm case-category">
                        positif
                    </div>
                </div>
            </div>
        </div>
        <div class="card statistics mr-3 case__died">
            <div class="card-body">
                <div class="row">
                    <div class="col-6">
                        <fai size="3x" icon="dizzy"/>
                    </div>
                    <div class="col-6 total-case text-right">
                        {{death}}
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm case-category">
                        meninggal
                    </div>
                </div>
            </div>
        </div>
        <div class="card statistics case__recovery">
            <div class="card-body">
                <div class="row">
                    <div class="col-6">
                        <fai size="3x" icon="grin"/>
                    </div>
                    <div class="col-6 total-case text-right">
                        {{recovered}}
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm case-category">
                        sembuh
                    </div>
                </div>
            </div>
        </div>
        <div class="note">
           Pembaharuan terakhir: {{lastUpdate}}<br>
           <b>Catatan:</b> Tanda "-" menandakan bahwa data tidak ditemukan atau sedang diperbaharui
        </div>
    </div>
</template>

<script>
    import { APIServiceCovid } from '../../services/APIServiceCovid';
    import { APIServiceCovidIndonesia } from '../../services/APIServiceCovidIndonesia';
    import moment from 'moment';
    import ContentLoader from '@/components/ContentLoader';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faDizzy, faFrownOpen, faGrin } from '@fortawesome/free-solid-svg-icons'
    library.add(faDizzy, faFrownOpen, faGrin)

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
            }
        },
        computed: {

        },
        methods: {
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
                        }
                    })
                    .catch(error => { console.error(error) })
                    .finally(() => { this.isLoading = false })
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
        min-width: 200px;
        display: inline-block;
        margin-top: 0;
        margin-bottom: 0;
    }
    .total-case {font-size: 1.9rem;}
    .case-category {
        font-size: 1.1rem;
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
        border-color: #94af9a;
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
