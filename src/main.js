import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import Trend from "vuetrend"
import VueApexCharts from "vue-apexcharts"
import VueMeta from 'vue-meta';
import VueAnalytics from "vue-analytics";

import store from './store'
import i18n from './i18n/i18n'

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

window.app = new Vue({
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')