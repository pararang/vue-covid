import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 'id'
  },
  mutations: {
    switchLang (state, lang) {
      state.lang = lang
      window.app.$i18n.locale = lang
    }
  },
  actions: {}
})
