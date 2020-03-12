import axios from 'axios';

const API_URL = 'https://covid19.mathdro.id/api';

export class APIService {

    constructor() {
        
    }

    getDataGlobal() {
        const url = `${API_URL}`;
        let data = axios.get(url).then(response => response.data);
        return data;
    }

    getDataGlobalConfirmedDetail() {
        const url = `${API_URL}/confirmed`;
        let data = axios.get(url).then(response => response.data);
        return data;
    }

}