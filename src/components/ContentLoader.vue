<template>
    <div class="content-loader">
        <div style="text-align: right;">
            <b-button pill @click="refreshData()" variant="primary" :disabled="isLoading">
                {{!isLoading? 'Muat Ulang': 'Sedang Memuat...'}}
            </b-button>
        </div>
        <template v-if="!isLoading">
            <slot name="content"></slot>
        </template>
        <div v-else>
            <b-spinner style="width: 3rem; height: 3rem;" class="m-5" label="Busy"></b-spinner>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ContentLoader",
        props: { isLoading: { default: true } },
        methods: {
            refreshData() {this.$emit('refresh-data')}
        }
    }
</script>