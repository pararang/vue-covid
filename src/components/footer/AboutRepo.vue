<template>
    <div>
        <div class="footer-copyright text-center py-3">© 2020
            <a :href="repoUrl">{{ repoDescription }}</a>
            <p class="small">|
            <span v-for="people in repoContributors">
                <a :href="people.html_url"> {{ people.login }} </a>|
            </span>
            </p>
        </div>
<!--        <div class="row">-->
<!--            <div v-for="people in repoContributors">-->
<!--                <div class="column">-->
<!--                    <img :src="people.avatar_url" :alt="people.login" :title="people.login">-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
    </div>

</template>

<script>
    import { APIServiceGithub } from "../../services/APIServiceGithub";

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
            },
            getContributorNames() {
                let names = [];
                this.repoContributors.forEach(function (people) {
                    names.push(people.login);
                });
                return names.join(', ');
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
        max-width:230px;
        max-height:95px;
        width: auto;
        height: auto;
    }
</style>