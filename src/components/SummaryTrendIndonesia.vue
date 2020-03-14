<template>
    <div class="card">
        <div class="card-header">
            Tren Indonesia
        </div>
        <div class="card-body">
            <trend
                    :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
                    :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                    auto-draw
                    smooth
            >
            </trend>
        </div>
    </div>

</template>

<script>
    // import {
    //     APIService
    // } from '../APIService';
    // import numeral from "numeral";


    // const apiService = new APIService();
    export default {
        name: "SummaryTrendIndonesia",
        data() {
            return {
                dailyDataConfirmed: [],
                dailyDataRecovered: [],
                dailyDataDeaths: [],
            };
        },
        methods: {

        },
        mounted() {
        },
    }
</script>

<style scoped>

</style>