import axios from 'axios';

const API_URL = 'https://jakarta.mathdro.id/api';

export class APIServiceCovidJakarta {

    constructor() {

    }

    httpGet = function (url) {
        return axios.get(url).then(response => response.data);
    }

    fetchData() {
        let url = `${API_URL}`;
        let data = this.httpGet(url);
        return data;
    }
}