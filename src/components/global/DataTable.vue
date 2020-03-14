<template>
    <div class="card">
        <div class="card-header">Global</div>
        <div class="card-body">
            <Grid :style="{height: '350px'}"
                  :data-items="detailConfirmedGlobal"
                  :columns="columns"
            >
            </Grid>
        </div>
    </div>
</template>

<script>
    import {
        APIServiceCovid
    } from '../../services/APIServiceCovid';
    import numeral from 'numeral';
    import { Grid } from '@progress/kendo-vue-grid'
    import '@progress/kendo-theme-default/dist/all.css'
    import moment from 'moment'

    const apiService = new APIServiceCovid();

    export default {
        name: "TableDetailGlobal",
        components: {
            Grid
        },
        data() {
            return {
                detailConfirmedGlobal: [],
                columns: [
                    { field: 'location', title: 'Lokasi' },
                    { field: 'confirmed', title: 'Terinfeksi' },
                    { field: 'deaths', title: 'Meninggal' },
                    { field: 'recovered', title: 'Pulih' },
                    { field: 'lastUpdate', title: 'Pembaharuan' }
                ],
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
        },
        mounted() {
            this.getDataConfirmedDetail();
        },
    }
</script>

<style scoped>

</style>