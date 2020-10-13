import Vue from 'vue';
import Vuex from 'vuex';
import nirModule from './nir';
import nirLaborsModule from './nirLabors';
import nirInnovationRateModule from './nirInnovationRate';
import nirStagesModule from './nirStages';
import nirGroupModule from './nirGroup';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    nirModule,
    nirLaborsModule,
    nirInnovationRateModule,
    nirStagesModule,
    nirGroupModule,
  },
});
