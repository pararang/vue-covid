import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import Trend from "vuetrend"
import VueApexCharts from "vue-apexcharts"
import VueGoogleCharts from 'vue-google-charts'
import { VuejsDatatableFactory } from 'vuejs-datatable';



import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';



Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(require('vue-moment'));
Vue.use(Trend);
Vue.use(VueApexCharts);
Vue.use(VueGoogleCharts);
Vue.use(VuejsDatatableFactory);

new Vue({
  render: h => h(App),
}).$mount('#app')
