<template>
    <div>
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
                <td class="text-right">{{ detail.confirmed }}</td>
                <td class="text-right">{{ detail.deaths }}</td>
                <td class="text-right">{{ detail.recovered }} </td>
                <td>{{ detail.lastUpdate | moment("YYYY/MM/DD HH:mm:ss") }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {
        APIService
    } from '../APIService';

    const apiService = new APIService();

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
            }
        },
        mounted() {
            this.getDataConfirmedDetail();
        },
    }
</script>

<style scoped>

</style>