import axios from 'axios';

const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1ma1T9hWbec1pXlwZ89WakRk-OfVUQZsOCFl4FwZxzVw/export?format=csv&gid=0';

export class APIServiceKawalKorona {
    constructor() {
    }

    fetchDataSpreadSheet() {
        let data = axios.get(SPREADSHEET_URL).then(response => response.data);
        console.log(data);
        return data;
    }

    getAllData() {
        return this.fetchDataSpreadSheet();
    }
}