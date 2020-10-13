import axios from 'axios';

const HOST = process.env.VUE_APP_API || '';

export default {
  state: {
    nirGroupList: [],
    nirGroupLaborList: [],
    softwareList: [],
  },
  getters: {
    NIR_GROUP_LIST: (state) => state.nirGroupList,
    NIR_GROUP_LABOR_LIST: (state) => state.nirGroupLaborList,
    SOFTWARE_LIST: (state) => state.softwareList,

  },
  mutations: {
    SET_NIR_GROUP_LIST: (state, list) => {
      state.nirGroupList = list;
    },
    SET_NIR_GROUP_LABOR_LIST: (state, list) => {
      state.nirGroupLaborList = list;
    },
    SET_SOFTWARE_LIST: (state, list) => {
      state.softwareList = list;
    },
  },
  actions: {
    GET_NIR_GROUP_LIST: async (context) => {
      await axios.get(`${HOST}/NirSoftwareDevLaborGroup`)
        .then((res) => {
          context.commit('SET_NIR_GROUP_LIST', res.data);
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e);
        });
    },
    GET_NIR_GROUP_LABOR_LIST: async (context) => {
      await axios.get(`${HOST}/SoftwareDevLabor/`)
        .then((res) => {
          context.commit('SET_NIR_GROUP_LABOR_LIST', res.data);
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e);
        });
    },
    GET_SOFTWARE_LIST: async (context) => {
      await axios.get(`${HOST}/SoftwareDevEnv`)
        .then((res) => {
          context.commit('SET_SOFTWARE_LIST', res.data);
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e);
        });
    },
  },
};
