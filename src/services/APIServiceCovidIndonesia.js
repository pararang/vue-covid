import axios from 'axios';

const API_URL = 'https://indonesia-covid19.mathdro.id/api';

export class APIServiceCovidIndonesia {

    constructor() {

    }

    httpGet = async function (url) {
        const response = await axios.get(url);
        console.log(response);
        return response;
    }

    fetchDataPerProvince() {
        let url = `${API_URL}/provinsi.csv`;
        let data = this.httpGet(url);
        return data;
    }

    fetchDataPerCase() {
        let url = `${API_URL}/kasus.csv`;
        let data = this.httpGet(url);
        return data;
    }
}