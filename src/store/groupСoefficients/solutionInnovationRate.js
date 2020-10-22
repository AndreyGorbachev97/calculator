import axios from 'axios';

const HOST = process.env.VUE_APP_API || '';

export default {
  state: {
    solutionInnovationRateList: [],
  },
  getters: {
    SOLUTION_INNOVATION_LIST: (state) => state.solutionInnovationRateList,
  },
  mutations: {
    SET_SOLUTION_INNOVATION_LIST: (state, list) => {
      state.solutionInnovationRateList = list;
    },
  },
  actions: {
    GET_SOLUTION_INNOVATION_LIST: async (context) => {
      await axios.get(`${HOST}/SolutionInnovationRate`)
        .then((res) => {
          context.commit('SET_SOLUTION_INNOVATION_LIST', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
