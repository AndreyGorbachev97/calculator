import axios from 'axios';

const HOST = process.env.VUE_APP_API || '';

export default {
  state: {
    listLabor: [],
  },
  getters: {
    LIST_LABOR: (state) => state.listLabor,
  },
  mutations: {
    SET_LIST_LABOR: (state, list) => {
      state.listLabor = list.map((el) => ({
        ...el,
        step: (el.maxVolume - el.minVolume) / 10,
        volume: el.maxVolume - (((el.maxVolume - el.minVolume) / 10) * 2),
        overMax: el.maxVolume + (((el.maxVolume - el.minVolume) / 10) * 3),
      }));
    },
  },
  actions: {
    GET_LIST_LABOR: async (context) => {
      await axios.get(`${HOST}/NirLabor`)
        .then((res) => {
          context.commit('SET_LIST_LABOR', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
