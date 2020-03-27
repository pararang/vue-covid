<template>
    <div>
        <div class="footer-copyright text-center py-3">© {{ currentYear }}
            <a :href="repoUrl">{{ repoDescription }}</a>
            <p>
            <span v-for="people in repoContributors" v-bind:key="people.login" class="mb-4">
                <b-avatar variant="info" :src="people.avatar_url" :href="people.html_url"></b-avatar>
            </span>
            </p>
        </div>
    </div>

</template>

<script>
    import {APIServiceGithub} from "../../services/APIServiceGithub";
    import moment from 'moment';

    const apiGithub = new APIServiceGithub();

    export default {
        name: "AboutRepo",
        data() {
            return {
                repoUrl: '',
                repoDescription: '',
                repoContributors: [],
            };
        },
        methods: {
            getDataContributors() {
                apiGithub.getDataContributors().then((data) => {
                    this.repoContributors = data;
                });
            },
            getDataRepo() {
                apiGithub.getDataRepo().then((data) => {
                    this.repoUrl = data.html_url;
                    this.repoDescription = data.description;
                });
            }
        },
        computed: {
            currentYear: function () {
                return moment().year();
            }
        },
        mounted() {
            this.getDataContributors();
            this.getDataRepo();
        },
    }
</script>

<style scoped>
    .row {
        display: flex;
    }

    .column {
        flex: 33.33%;
        padding: 5px;
    }

    img {
        display: block;
        max-width: 230px;
        max-height: 95px;
        width: auto;
        height: auto;
    }
</style>