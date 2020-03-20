<template>
    <div class="card">
        <div class="card-header">Indonesia</div>
        <div class="card-body">
            <Grid :style="{height: '350px'}" :data-items="dataSet" :columns="columns">
            </Grid>
        </div>
    </div>
</template>

<script>
    import {
        APIServiceKawalKorona
    } from '../../services/APIServiceKawalKorona';
    import numeral from 'numeral';
    import {
        Grid
    } from '@progress/kendo-vue-grid';
    import { APIServiceCovidIndonesia } from '../../services/APIServiceCovidIndonesia';
    // import moment from "moment";
    import '@progress/kendo-theme-default/dist/all.css'

    const apiKawalKorona = new APIServiceKawalKorona();
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
                provinces: []
            };
        },
        methods: {
            getDataConfirmedDetail() {
                apiKawalKorona.getAllData().then((data) => {
                    // console.log(data);
                    this.dataSet = data;
                    var lines = data.split(/\r\n|\n/);

                    //Set up the data arrays
                    // let time = [];
                    // let data1 = [];
                    // let data2 = [];
                    // let data3 = [];

                    // let headings = lines[0].split(','); // Splice up the first row to get the headings

                    for (let j = 1; j < lines.length; j++) {
                        let values = lines[j].split(','); // Split up the comma seperated values
                        // console.log(values);

                    }
                });
            },
            formatNumber(x) {
                return numeral(x).format('0,0');
            },
            generateDataTable() {
                apiCovidIndonesia.fetchDataPerProvince().then((data) => {
                    this.provinces = data;
                });
            }
        },
        mounted() {
            // this.getDataConfirmedDetail();
            this.generateDataTable();
        },
    }
</script>

<style scoped>

</style>