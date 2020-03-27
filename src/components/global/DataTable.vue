<template>
    <div class="card">
        <div class="card-header">Global</div>
        <div class="card-body">
            <Grid :style="{height: '350px'}" :data-items="sortedData" :columns="columns" :sortable="true" :sort="sort"
                :selected-field="selectedField"
                @selectionchange="onSelectionChange"
                @rowclick="onRowClick"
                @sortchange="sortChangeHandler">
            </Grid>
        </div>
    </div>
</template>

<script>
    import {
        APIServiceCovid
    } from '../../services/APIServiceCovid';
    import numeral from 'numeral';
    import {
        Grid
    } from '@progress/kendo-vue-grid'
    import '@progress/kendo-theme-default/dist/all.css'
    import {
        orderBy
    } from '@progress/kendo-data-query';
    import moment from 'moment';

    const apiService = new APIServiceCovid();
    
    import Vue from 'vue'
    
    export default {
        name: "DataTableGlobal",
        components: {
            Grid,
        },
        data() {
            return {
                detailConfirmedGlobal: [],
                columns: [{
                        field: 'location',
                        title: 'Lokasi'
                    },
                    {
                        field: 'confirmed',
                        title: 'Terinfeksi'
                    },
                    {
                        field: 'deaths',
                        title: 'Meninggal'
                    },
                    {
                        field: 'recovered',
                        title: 'Pulih'
                    },
                    {
                        field: 'lastUpdate',
                        title: 'Pembaharuan'
                    }
                ],
                sort: [{
                        field: 'location',
                        dir: 'asc'
                    }, {
                        field: 'confirmed',
                        dir: 'desc'
                    },

                ],
                countries: [],
                selectedField: 'selected',
            };
        },
        methods: {
            getDataConfirmedDetail() {
                apiService.getDataConfirmedDetailGlobal().then((data) => {
                    data.forEach(raw => {
                        raw.location = this.getLocation(raw);
                        raw.confirmed = this.formatNumber(raw.confirmed);
                        raw.deaths = this.formatNumber(raw.deaths);
                        raw.recovered = this.formatNumber(raw.recovered);
                        raw.lastUpdate = moment(raw.lastUpdate).format('YYYY/MM/DD HH:mm:ss ZZ');
                        this.detailConfirmedGlobal.push(raw);
                    });
                });
            },
            getDataConfirmedDistincCountry() {
                apiService.getDataConfirmedDetailGlobal().then((data) => {
                    let countries = [];
                    data.forEach(raw => {
                        // console.log(raw);
                        if (undefined === countries[raw.countryRegion]) {
                            countries[raw.countryRegion] = {
                                confirmed: raw.confirmed,
                                deaths: raw.deaths,
                                recovered: raw.recovered
                            };
                        } else {
                            let country = countries[raw.countryRegion];
                            countries[raw.countryRegion] = {
                                confirmed: raw.confirmed + country.confirmed,
                                deaths: raw.deaths + country.deaths,
                                recovered: raw.recovered + country.recovered
                            };
                        }
                        // console.log(this.countries);
                    });
                    //TODO find why this countries still empty
                    this.countries = countries;
                });
            },
            getLocation(detail) {
                if (null != detail.provinceState && null != detail.countryRegion) {
                    return detail.provinceState + ' (' + detail.countryRegion + ')';
                } else if (null == detail.provinceState && null != detail.countryRegion) {
                    return detail.countryRegion;
                } else if (null != detail.provinceState && null == detail.countryRegion) {
                    return detail.provinceState;
                } else {
                    return 'n/a';
                }
            },
            formatNumber(x) {
                return numeral(x).format('0,0');
            },
            sortChangeHandler: function (e) {
                this.sort = e.sort;
            },
            onSelectionChange: function (event) {
                Vue.set(event.dataItem, this.selectedField, !event.dataItem[this.selectedField])
            },
            onRowClick: function (event) {
                Vue.set(event.dataItem, this.selectedField, !event.dataItem[this.selectedField])
            }
        },
        computed: {
            sortedData: {
                get: function () {
                    return orderBy(this.detailConfirmedGlobal, this.sort);
                }
            }
        },
        mounted() {
            this.getDataConfirmedDetail();
            // this.getDataConfirmedDistincCountry();
        },

    }
</script>

<style scoped>

</style>