<template>
    <div class="card">
        <div class="card-header">Data Global</div>
        <div class="card-body">
            <table class="table">
                <thead>
                <tr>
                    <th class="text-left">Lokasi</th>
                    <th class="text-right">Kasus</th>
                    <th class="text-right">Meninggal</th>
                    <th class="text-right">Pulih</th>
                    <th>Update Terakhir</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="detail in detailConfirmedGlobal">
                    <td class="text-left">{{ getLocation(detail) }}</td>
                    <td class="text-right">{{ formatNumber(detail.confirmed) }}</td>
                    <td class="text-right">{{ formatNumber(detail.deaths) }}</td>
                    <td class="text-right">{{ formatNumber(detail.recovered) }} </td>
                    <td>{{ detail.lastUpdate | moment("YYYY/MM/DD HH:mm:ss") }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import {
        APIServiceCovid
    } from '../APIServiceCovid';
    import numeral from 'numeral';


    const apiService = new APIServiceCovid();

    export default {
        name: "TableDetailGlobal",
        data() {
            return {
                detailConfirmedGlobal: []
            };
        },
        methods: {
            getDataConfirmedDetail() {
                apiService.getDataConfirmedDetailGlobal().then((data) => {
                    this.detailConfirmedGlobal = data;
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
            }
        },
        mounted() {
            this.getDataConfirmedDetail();
        },
    }
</script>

<style scoped>

</style>