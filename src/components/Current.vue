<template>
    <h1>{{ msg }}</h1>
    <ul v-if="posts && posts.length">
        <li v-for="post of posts">
            <p><strong>{{post.title}}</strong></p>
            <p>{{post.body}}</p>
        </li>
    </ul>

    <ul v-if="errors && errors.length">
        <li v-for="error of errors">
            {{error.message}}
        </li>
    </ul>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Current',
        data() {
            return {
                posts: [],
                errors: [],
                msg: String
            }
        },

        // Fetches posts when the component is created.
        created() {
            axios.get(`http://jsonplaceholder.typicode.com/posts`)
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.posts = response.data
                })
                .catch(e => {
                    this.errors.push(e)
                })

            // async / await version (created() becomes async created())
            //
            // try {
            //   const response = await axios.get(`http://jsonplaceholder.typicode.com/posts`)
            //   this.posts = response.data
            // } catch (e) {
            //   this.errors.push(e)
            // }
        }
    }
</script>

<style scoped>

</style>