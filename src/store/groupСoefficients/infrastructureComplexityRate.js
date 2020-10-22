import axios from 'axios';

const HOST = process.env.VUE_APP_API || '';

export default {
  state: {
    infrastructureComplexityList: [],
  },
  getters: {
    INFRASTRUCTURE_COMPLEXITY_LIST: (state) => state.infrastructureComplexityList,
  },
  mutations: {
    SET_INFRASTRUCTURE_COMPLEXITY_LIST: (state, list) => {
      state.infrastructureComplexityList = list;
    },
  },
  actions: {
    GET_INFRASTRUCTURE_COMPLEXITY_LIST: async (context) => {
      await axios.get(`${HOST}/InfrastructureComplexityRate`)
        .then((res) => {
          context.commit('SET_INFRASTRUCTURE_COMPLEXITY_LIST', res.data);
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
};
