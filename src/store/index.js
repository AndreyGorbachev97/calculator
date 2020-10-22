import Vue from 'vue';
import Vuex from 'vuex';
import nirModule from './nir';
import nirLaborsModule from './nirLabors';
import nirInnovationRateModule from './nirInnovationRate';
import nirStagesModule from './nirStages';
import nirGroupModule from './nirGroup';
import architectureComplexityRateModule from './groupСoefficients/architectureComplexityRate';
import infrastructureComplexityRateModule from './groupСoefficients/infrastructureComplexityRate';
import solutionInnovationRateModule from './groupСoefficients/solutionInnovationRate';
import standardModulesUsingRateModule from './groupСoefficients/standardModulesUsingRate';
import testsDevelopmentRateModule from './groupСoefficients/testsDevelopmentRate';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    nirModule,
    nirLaborsModule,
    nirInnovationRateModule,
    nirStagesModule,
    nirGroupModule,
    architectureComplexityRateModule,
    infrastructureComplexityRateModule,
    solutionInnovationRateModule,
    standardModulesUsingRateModule,
    testsDevelopmentRateModule,
  },
});
