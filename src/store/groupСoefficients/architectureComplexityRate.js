import axios from 'axios';

const HOST = process.env.VUE_APP_API || '';

export default {
  state: {
    architectureComplexityList: [],
  },
  getters: {
    ARCHITECTURE_COMPLEXITY_LIST: (state) => state.architectureComplexityList,
  },
  mutations: {
    SET_ARCHITECTURE_COMPLEXITY_LIST: (state, list) => {
      state.architectureComplexityList = list;
    },
  },
  actions: {
    GET_ARCHITECTURE_COMPLEXITY_LIST: async (context) => {
      await axios.get(`${HOST}/ArchitectureComplexityRate`)
        .then((res) => {
          context.commit('SET_ARCHITECTURE_COMPLEXITY_LIST', res.data);
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
};
