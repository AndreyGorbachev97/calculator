import axios from 'axios';

const HOST = process.env.VUE_APP_API || '';

export default {
  state: {
    testsDevelopmentList: [],
  },
  getters: {
    TESTS_DEVELOPMENT_LIST: (state) => state.testsDevelopmentList,
  },
  mutations: {
    SET_TESTS_DEVELOPMENT_LIST: (state, list) => {
      state.testsDevelopmentList = list;
    },
  },
  actions: {
    GET_TESTS_DEVELOPMENT_LIST: async (context) => {
      await axios.get(`${HOST}/TestsDevelopmentRate`)
        .then((res) => {
          context.commit('SET_TESTS_DEVELOPMENT_LIST', res.data);
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
};
