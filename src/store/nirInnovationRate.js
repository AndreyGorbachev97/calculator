import axios from 'axios';

const HOST = process.env.VUE_APP_API || '';

export default {
  state: {
    nirInnovationRateList: [],
  },
  getters: {
    LIST_NIR_INNOVATION_RATE: (state) => state.nirInnovationRateList,
  },
  mutations: {
    SET_LIST_NIR_INNOVATION_RATE: (state, list) => {
      state.nirInnovationRateList = list;
    },
  },
  actions: {
    GET_LIST_NIR_INNOVATION_RATE: async (context) => {
      axios.get(`${HOST}/NirInnovationRate`)
        .then((res) => {
          context.commit('SET_LIST_NIR_INNOVATION_RATE', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
