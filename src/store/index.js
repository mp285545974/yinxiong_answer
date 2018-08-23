import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    countDownSeconds:12,
    currentSeconds:12
  },
  mutations: {
    countDownSeconds (state, b) {
      state.countDownSeconds = b
    },
    currentSeconds (state, b) {
      state.currentSeconds = b
    }
  },
  actions: {
    countDownSeconds (context, b) {
      context.commit('countDownSeconds', b)
    },
    currentSeconds (context, b) {
      context.commit('currentSeconds', b)
    }
  }
})

export default store
