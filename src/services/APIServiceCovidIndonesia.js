import axios from 'axios';

const API_URL = 'https://indonesia-covid19.mathdro.id/api';

export class APIServiceCovidIndonesia {

    constructor() {
        this.config = {
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        };
    }

    httpGet = async function (url) {
        return axios.get(url, this.config).then(response => response.data);
    }

    index() {
        let url = `${API_URL}`;
        let data = this.httpGet(url);
        console.log(data);
        return data;
    }

    fetchDataPerProvince() {
        let url = `${API_URL}/provinsi`;
        let data = this.httpGet(url);
        return data;
    }

    fetchDataPerCase() {
        let url = `${API_URL}/kasus`;
        let data = this.httpGet(url);
        return data;
    }

}