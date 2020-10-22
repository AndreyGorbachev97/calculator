import axios from 'axios';

const HOST = process.env.VUE_APP_API || '';

export default {
  state: {
    standardModulesUsingList: [],
  },
  getters: {
    STANDARD_MODULES_USING_LIST: (state) => state.standardModulesUsingList,
  },
  mutations: {
    SET_STANDARD_MODULES_USING_LIST: (state, list) => {
      state.standardModulesUsingList = list;
    },
  },
  actions: {
    GET_STANDARD_MODULES_USING_LIST: async (context) => {
      await axios.get(`${HOST}/StandardModulesUsingRate`)
        .then((res) => {
          context.commit('SET_STANDARD_MODULES_USING_LIST', res.data);
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
};
