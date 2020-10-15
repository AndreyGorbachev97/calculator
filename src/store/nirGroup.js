import axios from 'axios';

const HOST = process.env.VUE_APP_API || '';

export default {
  state: {
    nirGroupList: [],
    nirGroupLaborList: [],
    softwareList: [],
    softwareLaborList: [],
  },
  getters: {
    NIR_GROUP_LIST: (state) => state.nirGroupList,
    NIR_GROUP_LABOR_LIST: (state) => state.nirGroupLaborList,
    SOFTWARE_LIST: (state) => state.softwareList,
    SOFTWARE_LABOR_LIST: (state) => state.softwareLaborList,
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
    SET_SOFTWARE_LABOR_LIST: (state, list) => {
      state.softwareLaborList = list.map((el) => ({
        ...el,
        step: (el.maxVolume - el.minVolume) / 10,
        volume: el.maxVolume - (((el.maxVolume - el.minVolume) / 10) * 2),
        overMax: el.maxVolume + (((el.maxVolume - el.minVolume) / 10) * 3),
      }));
    },
  },
  actions: {
    GET_NIR_GROUP_LIST: async (context) => {
      await axios.get(`${HOST}/NirSoftwareDevLaborGroup`)
        .then((res) => {
          context.commit('SET_NIR_GROUP_LIST', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    GET_NIR_GROUP_LABOR_LIST: async (context) => {
      await axios.get(`${HOST}/SoftwareDevLabor/`)
        .then((res) => {
          context.commit('SET_NIR_GROUP_LABOR_LIST', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    GET_SOFTWARE_LIST: async (context) => {
      await axios.get(`${HOST}/SoftwareDevEnv`)
        .then((res) => {
          context.commit('SET_SOFTWARE_LIST', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    GET_SOFTWARE_LABOR_LIST: async (context) => {
      await axios.get(`${HOST}/SoftwareDevLaborVolumeRange`)
        .then((res) => {
          context.commit('SET_SOFTWARE_LABOR_LIST', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
