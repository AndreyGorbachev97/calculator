import axios from 'axios';
import moment from 'moment';

const HOST = process.env.VUE_APP_API || '';

export default {
  state: {
    stageList: [],
    currentStages: [],
  },
  getters: {
    NIR_STAGE_LIST: (state) => state.stageList,
    CURRENT_STAGES: (state) => state.currentStages,
  },
  mutations: {
    SET_SAVE_NIR_STAGE: (state, stage) => {
      const index = state.stageList.findIndex((el) => el.id === stage.id);
      console.log('stage', stage);
      const modStage = {
        ...stage,
        dateFrom: moment(stage.dateFrom).format('YYYY-DD-MM'),
        dateTo: moment(stage.dateTo).format('YYYY-MM-DD'),
      };
      console.log(modStage);
      console.log(index);
      if (index >= 0) {
        stage.stageList.splice(index, 1, modStage);
      }
    },
    SET_ADD_NIR_STAGE: (state, stage) => {
      state.stageList = [...state.stageList, {
        ...stage,
        dateFrom: moment(stage.dateFrom).format('YYYY-MM-DD'),
        dateTo: moment(stage.dateTo).format('YYYY-MM-DD'),
      }];
    },
    SET_DELETE_NIR_STAGE: (state, id) => {
      state.stageList = state.stageList.filter((stage) => stage.id !== id);
    },
    SET_STAGE_LIST: (state, list) => {
      state.stageList = list.map((stage) => ({
        ...stage,
        dateFrom: moment(stage.dateFrom).format('YYYY-MM-DD'),
        dateTo: moment(stage.dateTo).format('YYYY-MM-DD'),
      }));
    },
    SET_CURRENT_STAGES: (state, list) => {
      state.currentStages = list.map((stage) => ({
        ...stage,
        list: [],
        groups: [],
      }));
    },
  },
  actions: {
    ADD_NIR_STAGE: async (context, payload) => {
      await axios.post(`${HOST}/NirStage`, payload)
        .then((res) => {
          context.commit('SET_ADD_NIR_STAGE', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    SAVE_NIR_STAGE: async (context, payload) => {
      await axios.put(`${HOST}/NirStage?id=${payload.id}`, payload)
        .then((res) => {
          console.log('res', res);
          context.commit('SET_SAVE_NIR_STAGE', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    DELETE_NIR_STAGE: async (context, id) => {
      await axios.delete(`${HOST}/NirStage/${id}`)
        .then((res) => {
          context.commit('SET_DELETE_NIR_STAGE', id);
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    GET_CURRENT_STAGES: async (context, id) => {
      await axios.get(`${HOST}/Nir/${id}/Stages`)
        .then((res) => {
          context.commit('SET_CURRENT_STAGES', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    GET_NIR_STAGE_LIST: async (context, id) => {
      await axios.get(`${HOST}/NirStage?nirId=${id}`)
        .then((res) => {
          context.commit('SET_STAGE_LIST', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
