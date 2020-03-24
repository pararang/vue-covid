import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import Trend from "vuetrend"
import VueApexCharts from "vue-apexcharts"
import VueMeta from 'vue-meta';
import VueAnalytics from "vue-analytics";


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(require('vue-moment'));
Vue.use(Trend);
Vue.use(VueApexCharts);
Vue.use(VueMeta);
Vue.use(VueAnalytics, {
  id: 'UA-161491409-1',
  checkDuplicatedScript: false
});

new Vue({
  render: h => h(App),
}).$mount('#app')