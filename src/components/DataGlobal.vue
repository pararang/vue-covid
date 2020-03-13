<template>
    <div>
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
                <div class="card">
                    <div class="card-header alert alert-danger h1" role="alert">
                            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                            Total: {{ totalConfirmedGlobal }}
                        </div>
                    <!-- <div class="card-header">
                        <span>Sebaran</span>
                    </div> -->
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
                                    <td class="text-right">{{ detail.confirmed }}</td>
                                    <td class="text-right">{{ detail.deaths }}</td>
                                    <td class="text-right">{{ detail.recovered }} </td>
                                    <td>{{ detail.lastUpdate | moment("YYYY/MM/DD HH:mm:ss") }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-1"></div>
        </div>
    </div>
</template>


<script>
    import {
        APIService
    } from '../APIService';

    const apiService = new APIService();

    export default {

        name: 'DataGlobal',

        components: {

        },

        data() {

            return {
                totalConfirmedGlobal: 0,
                detailConfirmedGlobal: []
            };

        },

        methods: {
            countConfirmedGlobal() {
                apiService.getDataGlobal().then((data) => {
                    this.totalConfirmedGlobal = data.confirmed.value;
                });
            },
            getDataConfirmedDetail() {
                apiService.getDataDetailGlobal().then((data) => {
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
            this.countConfirmedGlobal();
            this.getDataConfirmedDetail();
        },
    }
</script>