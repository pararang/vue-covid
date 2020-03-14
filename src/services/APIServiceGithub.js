import axios from 'axios';

const API_URL = 'https://api.github.com';
const REPO_OWNER = 'pararang';
const REPO_NAME = 'vue-covid';

export class APIServiceGithub {

    constructor() {

    }

    httpGet = function (url) {
        return axios.get(url).then(response => response.data);
    }
    getDataRepo() {
        let url = `${API_URL}/repos/${REPO_OWNER}/${REPO_NAME}`;
        let data = this.httpGet(url);
        return data;
    }

    getDataContributors() {
        let url = `${API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contributors`;
        let data = this.httpGet(url);
        return data;
    }
}