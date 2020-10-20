import axios from 'axios';
import moment from 'moment';

const HOST = process.env.VUE_APP_API || '';
moment.locale('ru');

export default {
  state: {
    nirList: [],
    currentNir: {},
    createdNirId: '',
  },
  getters: {
    CURRENT_NIR: (state) => state.currentNir,
    NIR_LIST: (state) => state.nirList,
    CREATED_NIR_ID: (state) => state.createdNirId,
  },
  mutations: {
    SET_NIR_LIST: (state, list) => {
      state.nirList = list.map((el) => ({
        ...el,
        createTime: moment(el.createTime).format('DD MMM YYYY, HH:mm'),
        dateFrom: moment(el.dateFrom).format('DD MMM YYYY'),
        dateTo: moment(el.dateTo).format('DD MMM YYYY'),
      }));
    },
    SET_NIR_CURRENT: (state, nir) => {
      const modStages = nir.stages ? nir.stages.map((stage) => ({
        ...stage,
        dateFrom: moment(stage.dateFrom).format('YYYY-MM-DD'),
        dateTo: moment(stage.dateTo).format('YYYY-MM-DD'),
        laborVolumes: stage.laborVolumes.map((el) => ({
          ...el,
          labor: {
            ...el.labor,
            step: (el.labor.maxVolume - el.labor.minVolume) / 10,
            overMax: el.labor.maxVolume + (((el.labor.maxVolume - el.labor.minVolume) / 10) * 3),
          },
        })),
        softwareDevLaborGroups: stage.softwareDevLaborGroups.map((group) => ({
          ...group,
          laborVolumes: group.laborVolumes.map((labor) => ({
            ...labor.laborVolumeRange,
            step: (labor.laborVolumeRange.maxVolume - labor.laborVolumeRange.minVolume) / 10,
            overMax: labor.laborVolumeRange.maxVolume
            + (((labor.laborVolumeRange.maxVolume - labor.laborVolumeRange.minVolume) / 10) * 3),
            volume: labor.volume,
          })),
        })),
      })) : [];
      if (nir.stages[0]) {
        state.currentNir = { ...nir, stages: modStages };
      } else {
        const date = new Date();
        const firstDate = new Date();
        const lastDate = date.setFullYear(date.getFullYear() + 1);
        const stages = [{
          dateFrom: firstDate.toISOString().substr(0, 10),
          dateTo: moment(lastDate).format('YYYY-MM-DD'),
          groups: [],
          laborVolumes: [],
          nirInnovationRateID: null,
          nirInnovationRateValue: 0,
          volume: 0,
        }];
        state.currentNir = { ...nir, stages };
      }
    },
    ADD_NEW_NIR: (state, nir) => {
      state.createdNirId = nir.id;
      state.nirList = [...state.nirList,
        {
          ...nir,
          createTime: moment(nir.createTime).format('MMM DD YYYY, HH:mm'),
          updateTime: moment(nir.createTime).format('MMM DD YYYY, HH:mm'),
        },
      ];
    },
    SET_DELETE_TASK: (state, id) => {
      state.nirList = state.nirList.filter((el) => el.id !== id);
    },
  },
  actions: {
    GET_NIR_CURRENT: async (context, id) => {
      await axios.get(`${HOST}/Nir/${id}`)
        .then((res) => {
          context.commit('SET_NIR_CURRENT', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    GET_NIR_LIST: async (context) => {
      await axios.get(`${HOST}/Nir`)
        .then((res) => {
          context.commit('SET_NIR_LIST', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    CREATE_NIR: async (context, payload) => {
      await axios.post(`${HOST}/Nir`, payload)
        .then((res) => {
          context.commit('ADD_NEW_NIR', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    DELETE_NIR: async (context, id) => {
      await axios.delete(`${HOST}/Nir/${id}`)
        .then(() => {
          context.commit('SET_DELETE_TASK', id);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
