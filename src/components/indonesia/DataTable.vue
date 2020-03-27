<template>
    <div>
        <br>
        <p class="title"><strong>Data Per Provinsi</strong></p>
        <Grid :style="{height: '350px'}" :data-items="sortedData" :columns="columns" :sortable="true" :sort="sort"
              @sortchange="sortChangeHandler">
        </Grid>
    </div>
</template>

<script>
    import numeral from 'numeral';
    import {
        Grid
    } from '@progress/kendo-vue-grid';
    import { APIServiceCovidIndonesia } from '../../services/APIServiceCovidIndonesia';
    import '@progress/kendo-theme-default/dist/all.css';
    import {orderBy} from "@progress/kendo-data-query";

    const apiCovidIndonesia = new APIServiceCovidIndonesia();

    export default {
        name: "DataTableIndonesia",
        components: {
            Grid
        },
        data() {
            return {
                dataSet: [],
                columns: [{
                        field: 'provinsi',
                        title: 'Provinsi'
                    },
                    {
                        field: 'kasusPosi',
                        title: 'Terinfeksi'
                    },
                    {
                        field: 'kasusMeni',
                        title: 'Meninggal'
                    },
                    {
                        field: 'kasusSemb',
                        title: 'Pulih'
                    }
                ],
                sort: [{
                    field: 'provinsi',
                    dir: 'asc'
                }, {
                    field: 'kasusPosi',
                    dir: 'desc'
                }]
            };
        },
        methods: {
            formatNumber(x) {
                return numeral(x).format('0,0');
            },
            sortChangeHandler: function (e) {
                this.sort = e.sort;
            },
            generateDataTable() {
                apiCovidIndonesia.fetchDataPerProvince().then((data) => {
                    this.dataSet = data.data.data;
                });
            }
        },
        computed: {
            sortedData: {
                get: function () {
                    return orderBy(this.dataSet, this.sort);
                }
            }
        },
        mounted() {
            this.generateDataTable();
        },
    }
</script>

<style scoped>

</style>