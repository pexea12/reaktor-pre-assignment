import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const URL = process.env.NODE_ENV === 'production'
  ? 'https://backend.reaktor.jebetech.online'
  : 'http://localhost:3000';

export default new Vuex.Store({
  state: {
    items: [],
    loading: false,
  },
  mutations: {
    setItems(state, items) {
      Vue.set(state, 'items', items);
    },

    setLoading(state, status) {
      Vue.set(state, 'loading', status);
    },
  },
  actions: {
    async fetchData({ commit }) {
      commit('setLoading', true);
      const { data } = await axios.get(URL);
      commit('setLoading', false);

      commit('setItems', data);
    },
  },
});
