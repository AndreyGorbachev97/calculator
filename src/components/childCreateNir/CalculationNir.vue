<template>
  <div v-if="data.nir.stages">
    <div class="text-bold" style="display: flex">
      <h2 class="text--secondary">{{data.nir.name}} </h2>
      <v-chip class="ml-3" outlined color="success">
        <v-avatar left>
          <v-icon>mdi-cash-multiple</v-icon>
        </v-avatar>
        {{volumeNir.toFixed(3)}}
      </v-chip>
    </div>
    <v-timeline v-if="data.nir.stages[0]" dense >
      <v-timeline-item small v-for="(item, i) in data.nir.stages" :key="i">
        <v-card class="elevation-2">
          <v-card-title
            style="position: relative; display: flex; justify-content: space-between"
          >
            <v-row>
              <v-col style="display: flex; align-items: center" cols="7">
                <div class="text-medium">Этап {{i + 1}}</div>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          class="ml-2"
                          color="error"
                          @click="saveStage(item, i)"
                          :disabled="comparison[i]"
                          icon
                        >
                          <v-icon>
                            mdi-content-save
                          </v-icon>
                        </v-btn>
                    </template>
                    <span>Сохранить</span>
                  </v-tooltip>
                <div class="ml-5 mr-2" style="width: 20%">
                  <date-input
                    title="Действует с:"
                    :value="item.dateFrom"
                    :stageIndex="i"
                    @changeDate="changeDateFrom"
                  />
                </div>
                <div class="ml-2 mr-2" style="width: 20%">
                  <date-input
                    title="Действует по:"
                    :value="item.dateTo"
                    :stageIndex="i"
                    @changeDate="changeDateTo"
                  />
                </div>
              </v-col>
              <v-col cols="5" style="display: flex; align-items: center; justify-content: flex-end">
                <v-chip class="text-medium" outlined color="success">
                  <v-avatar left>
                    <v-icon>mdi-cash-multiple</v-icon>
                  </v-avatar>
                  {{`( ${(sumStageLabor[i].sumLabor).toFixed(3)} + ${sumGroup[i].toFixed(3)} ) x
                  ${item.nirInnovationRateValue}
                  = ${(volumeLaborStages[i]).toFixed(3)}`}}
                </v-chip>
                <v-btn
                  class="ml-2"
                  v-if="i === data.nir.stages.length - 1 & i !== 0"
                  icon
                  @click="deleteStage(item.id)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <div style="display: flex">
              <dialog-add-works
                class="ml-2 mb-3"
                title="добавить работы"
                :fullList="listLabor"
                :listSelected="modListSelected([...item.laborVolumes])"
                :initialListSelected="modListSelected([...item.laborVolumes])"
                :stageIndex="i"
                titleCard="Список работ"
                :addList="addListLabor"
              />
              <dialog-add-groups
                class="ml-2 mb-3"
                title="добавить группы работ"
                :fullList="listGroup"
                :listSelected="[...item.softwareDevLaborGroups]"
                :stageIndex="i"
                titleCard="Список групп работ"
                :addList="addListGroup"
              />
            </div>
            <div>
              <v-expansion-panels
                flat
                multiple
                hover
                accordion
                focusable
              >
                <v-expansion-panel>
                  <v-expansion-panel-header >
                    <div class="text-medium" style="display: flex; align-items: center">
                      <div class="text-medium" style="width: 70%">
                        Коффициент новизны
                      </div>
                      <v-icon
                        v-if="!item.nirInnovationRateValue"
                        class="ml-2"
                        color="warning"
                      >
                        mdi-alert-circle
                      </v-icon>
                      <div v-else class="text-medium ml-2">{{item.nirInnovationRateValue}}</div>
                    </div>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <novelty-rate
                      :saveInnovationRate="addInnovationRateStage"
                      :listLabor="sortListLabor"
                      :nirInnovationRateID="item.nirInnovationRateID"
                      :stageId="i"
                    />
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header >
                    <div class="text-medium" style="display: flex; align-items: center">
                      <div class="text-medium" style="width: 70%">
                        Трудозатраты
                      </div>
                      <v-icon
                        v-if="!sumStageLabor[i].sumLabor"
                        class="ml-2"
                        color="warning"
                      >
                        mdi-alert-circle
                      </v-icon>
                      <div v-else class="text-medium ml-2">
                        {{sumStageLabor[i].sumLabor.toFixed(3)}}
                      </div>
                    </div>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                        <tr>
                          <th style="width: 65%" class="text-left">Виды работ</th>
                          <th style="width: 30%" class="text-left">Трудоемкость</th>
                          <th class="text-left">Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(el, j) in item.laborVolumes ? item.laborVolumes : []" :key="j">
                          <td >{{ el.labor.name }}</td>
                          <td>
                            <div style="display: flex; align-items: center">
                              <v-slider
                                style="width: 80%"
                                :step="el.labor.step"
                                tick-size="3"
                                ticks="always"
                                :min="el.labor.minVolume"
                                :max="el.labor.overMax"
                                :color="colorSlider(
                                  el.labor.maxVolume,
                                  item.laborVolumes[j].volume,
                                )"
                                track-color="grey"
                                dense
                                single-line
                                hide-details
                                thumb-label
                                v-model="item.laborVolumes[j].volume"
                              >
                                <template v-slot:thumb-label="{ value }">
                                  {{ value.toFixed(3) }}
                                </template>
                              </v-slider>
                              <div class="pl-1" style="width: 20%">{{el.volume.toFixed(2)}}</div>
                            </div>
                          </td>
                          <td>
                            <v-btn
                              @click="deleteElementList(i, el.labor.id)"
                              icon
                              x-small
                              color="error"
                            >
                              <v-icon>mdi-delete-outline</v-icon>
                            </v-btn>
                          </td>
                        </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <v-divider v-if="item.softwareDevLaborGroups[0]" />
              <v-expansion-panels
                flat
                multiple
                hover
                accordion
                focusable
              >
                <v-expansion-panel v-for="(group, j) in item.softwareDevLaborGroups" :key="j">
                  <v-expansion-panel-header >
                    <div style="display: flex; align-items: center">
                      <div class="text-medium" style="width: 70%">
                        {{group.name}}
                      </div>
                      <v-icon
                        v-if="!group.laborVolumes[0]"
                        class="ml-2"
                        color="warning"
                      >
                        mdi-alert-circle
                      </v-icon>
                      <div v-else class="text-medium ml-2">
                        {{sumStageLabor[i].sumGroupLabor[j].toFixed(3)}}
                        {{data.nir.stages[i]
                        .softwareDevLaborGroups[j].architectureComplexityRateValue}}
                      </div>
                      <v-spacer />
                      <dialog-add-works-from-group
                        :listSelected="group.laborVolumes"
                        :stageIndex="i"
                        :groupIndex="j"
                        titleCard="Список работ"
                        :addList="addListLaborToGroup"
                      />
                      <dialog-settings-group
                        class="ml-2"
                        :architectureComplexityRateID="group.architectureComplexityRateID"
                        :infrastructureComplexityRateID="group.infrastructureComplexityRateID"
                        :standardModulesUsingRateID="group.standardModulesUsingRateID"
                        :testsDevelopmentRateID="group.testsDevelopmentRateID"
                        :solutionInnovationRateID="group.solutionInnovationRateID"
                        :indexStage="i"
                        :indexGroup="j"
                        :addSettingsGroup="addSettingsGroup"
                        :addCoefficient="addCoefficient"
                      />
                      <v-btn
                        @click.stop="deleteGroup(i, group.id)"
                        class="ma-2"
                        icon
                        x-small
                        color="error"
                      >
                        <v-icon>mdi-delete-outline</v-icon>
                      </v-btn>
                    </div>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                        <tr>
                          <th style="width: 45%" class="text-left">Виды работ</th>
                          <th style="width: 15%" class="text-left">Язык</th>
                          <th style="width: 30%" class="text-left">Трудоемкость</th>
                          <th class="text-left">Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(el, q) in group.laborVolumes" :key="q">
                          <td>{{  el.labor.name }}</td>
                          <td>
                            <v-chip small :color="chipСolor[el.devEnv.id]">
                              {{ el.devEnv.name }}
                            </v-chip>
                          </td>
                          <td>
                            <div style="display: flex; align-items: center">
                              <v-slider
                                style="width: 80%"
                                :step="el.step"
                                tick-size="3"
                                ticks="always"
                                :min="el.minVolume"
                                :max="el.overMax"
                                :color="colorSlider(
                                  el.maxVolume,
                                  el.volume,
                                )"
                                track-color="grey"
                                dense
                                single-line
                                hide-details
                                thumb-label
                                v-model="el.volume"
                              >
                                <template v-slot:thumb-label="{ value }">
                                  {{ value.toFixed(3) }}
                                </template>
                              </v-slider>
                              <div class="pl-1" style="width: 20%">{{el.volume.toFixed(2)}}</div>
                            </div>
                          </td>
                          <td>
                            <v-btn
                              @click="deleteGroupElementList(i, j, el.id)"
                              icon
                              x-small
                              color="error"
                            >
                              <v-icon>mdi-delete-outline</v-icon>
                            </v-btn>
                          </td>
                        </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <v-btn
      :disabled="data.nir.stages[0]
       ? !data.nir.stages[data.nir.stages.length - 1].laborVolumes[0] : false"
      color="primary"
      @click="addStage()"
    >
      Добавить этап
    </v-btn>
  </div>
</template>

<script>
import moment from 'moment';
import DialogAddWorks from '../minor/DialogAddWorks.vue';
import DialogAddGroups from '../minor/DialogAddGroups.vue';
import DialogAddWorksFromGroup from '../minor/DialogAddWorksFromGroup.vue';
import NoveltyRate from './NoveltyRate.vue';
import DateInput from '../minor/DateInput.vue';
import DialogSettingsGroup from '../minor/DialogSettingsGroup.vue';
import { sortListInnovationRate, compare } from '../../utils/helpers';

export default {
  name: 'CalculationNir',
  props: {
    listLabor: Array,
    listGroup: Array,
    actions: Object,
    data: Object,
  },
  components: {
    DialogAddWorks,
    NoveltyRate,
    DateInput,
    DialogAddGroups,
    DialogAddWorksFromGroup,
    DialogSettingsGroup,
  },
  data() {
    return {
      valid: true,
      stages: this.data.nir ? this.data.nir.stages : [],
      modifiedDate: '',
      chipСolor: {
        1: 'error',
        2: 'primary',
        3: 'success',
        4: 'warning',
      },
    };
  },
  computed: {
    comparison() {
      return compare(
        this.data.nir.stages,
        this.data.nirStages,
        this.data.nir.volume,
        this.modifiedDate,
      );
    },
    sortListLabor() {
      return sortListInnovationRate(this.data.listNirInnovationRate);
    },
    sumStageLabor() {
      console.log('test');
      return this.data.nir.stages
        .map((stage) => ({
          sumLabor: stage.laborVolumes.reduce((acc, el) => acc + el.volume, 0),
          sumGroupLabor: stage.softwareDevLaborGroups
            .map((group) => {
              const coefficient = group.architectureComplexityRateValue
              * group.infrastructureComplexityRateValue
              * group.solutionInnovationRateValue
              * group.standardModulesUsingRateValue
              * group.testsDevelopmentRateValue;
              return coefficient * group.laborVolumes.reduce((acc, el) => acc + el.volume, 0);
            }),
        }));
    },
    sumGroup() {
      return this.sumStageLabor.map((group) => group.sumGroupLabor
        .reduce((acc, el) => acc + el, 0));
    },
    volumeLaborStages() {
      return this.data.nir.stages.map((stage, i) => {
        if (stage.nirInnovationRateValue) {
          return stage.nirInnovationRateValue * (this.sumStageLabor[i].sumLabor + this.sumGroup[i]);
        }
        return 0;
      });
    },
    volumeNir() {
      return this.volumeLaborStages.reduce((acc, el) => acc + el, 0);
    },
  },
  methods: {
    modListSelected(list) {
      return list.map((el) => ({
        volume: el.volume,
        ...el.labor,
      }));
    },
    changeDateFrom(data) {
      this.data.nir.stages[data.stageIndex].dateFrom = data.date;
      this.modifiedDate = data.date;
    },
    changeDateTo(data) {
      this.data.nir.stages[data.stageIndex].dateTo = data.date;
      this.modifiedDate = data.date;
    },
    addInnovationRateStage(item, stageId) {
      this.data.nir.stages[stageId].nirInnovationRateID = item.id;
      this.data.nir.stages[stageId].nirInnovationRateValue = item.value;
    },
    colorSlider(maxValue, value) {
      return value > maxValue ? 'error' : 'primary';
    },
    async saveStage(payload, index) {
      if (payload.id) {
        await this.actions.saveStage({
          code: payload.code,
          name: payload.name,
          volume: 0,
          id: payload.id,
          nirInnovationRateID: payload.nirInnovationRateID,
          dateFrom: payload.dateFrom,
          dateTo: payload.dateTo,
          nirID: this.data.nirId,
          laborVolumes: payload.laborVolumes.map((el) => ({
            id: el.id,
            laborID: el.labor.id,
            volume: el.volume,
          })),
          ontdLaborVolumes: [],
          softwareDevLaborGroups: payload.softwareDevLaborGroups.map((el) => ({
            ...el,
            softwareDevLaborGroupID: el.softwareDevLaborGroupID || el.id,
            laborVolumes: el.laborVolumes.map((labor) => ({
              volume: labor.volume,
              laborVolumeRangeID: labor.id,
            })),
          })),
        });
      } else {
        await this.actions.addStage({
          code: index,
          name: `Этап ${index}`,
          nirInnovationRateID: payload.nirInnovationRateID,
          dateFrom: payload.dateFrom,
          dateTo: payload.dateTo,
          nirID: this.data.nirId,
          laborVolumes: payload.laborVolumes.map((el) => ({
            laborID: el.labor.id,
            volume: el.volume,
          })),
          softwareDevLaborGroups: payload.softwareDevLaborGroups.map((el) => ({
            ...el,
            softwareDevLaborGroupID: el.id,
            laborVolumes: el.laborVolumes.map((labor) => ({
              volume: labor.volume,
              laborVolumeRangeID: labor.id,
            })),
          })),
        });
      }
    },
    addStage() {
      const date = new Date();
      const firstDate = new Date();
      const lastDate = date.setFullYear(date.getFullYear() + 1);
      this.data.nir.stages = [
        ...this.data.nir.stages,
        {
          dateFrom: firstDate.toISOString().substr(0, 10),
          dateTo: moment(lastDate).format('YYYY-MM-DD'),
          laborVolumes: [],
          nirInnovationRateID: null,
          softwareDevLaborGroups: [],
          nirInnovationRateValue: 0,
          volume: 0,
        },
      ];
    },
    addCoefficient(indexStage, indexGroup, сoefficient) {
      this.sumStageLabor[indexStage].sumGroupLabor[indexGroup] = this.sumStageLabor[indexStage]
        .sumGroupLabor[indexGroup] * сoefficient;
    },
    addSettingsGroup(indexStage, indexGroup, obj) {
      this.data.nir.stages[indexStage].softwareDevLaborGroups[indexGroup]
        .architectureComplexityRateValue = obj.architectureComplexityRateValue;
      this.data.nir.stages[indexStage].softwareDevLaborGroups[indexGroup]
        .infrastructureComplexityRateID = obj.infrastructureComplexityRateID;
      this.data.nir.stages[indexStage].softwareDevLaborGroups[indexGroup]
        .infrastructureComplexityRateValue = obj.infrastructureComplexityRateValue;
      this.data.nir.stages[indexStage].softwareDevLaborGroups[indexGroup]
        .solutionInnovationRateID = obj.solutionInnovationRateID;
      this.data.nir.stages[indexStage].softwareDevLaborGroups[indexGroup]
        .solutionInnovationRateValue = obj.solutionInnovationRateValue;
      this.data.nir.stages[indexStage].softwareDevLaborGroups[indexGroup]
        .standardModulesUsingRateID = obj.standardModulesUsingRateID;
      this.data.nir.stages[indexStage].softwareDevLaborGroups[indexGroup]
        .standardModulesUsingRateValue = obj.standardModulesUsingRateValue;
      this.data.nir.stages[indexStage].softwareDevLaborGroups[indexGroup]
        .testsDevelopmentRateID = obj.testsDevelopmentRateID;
      this.data.nir.stages[indexStage].softwareDevLaborGroups[indexGroup]
        .testsDevelopmentRateValue = obj.testsDevelopmentRateValue;
    },
    addListLabor(index, list) {
      this.data.nir.stages[index].laborVolumes = list;
    },
    addListGroup(index, groups) {
      this.data.nir.stages[index].softwareDevLaborGroups = groups;
    },
    addListLaborToGroup(indexStage, indexGroup, list) {
      this.data.nir.stages[indexStage].softwareDevLaborGroups[indexGroup].laborVolumes = list;
    },
    deleteStage(id) {
      this.data.nir.stages.pop();
      if (id) this.actions.deleteStage(id);
    },
    deleteGroup(stageIndex, groupId) {
      this.data.nir.stages[stageIndex].softwareDevLaborGroups = this.data
        .nir.stages[stageIndex].softwareDevLaborGroups
        .filter((el) => el.id !== groupId);
    },
    deleteElementList(stageIndex, elementId) {
      console.log(elementId);
      const index = this.data.nir.stages[stageIndex].laborVolumes
        .findIndex((el) => el.labor.id === elementId);
      console.log(index);
      this.data.nir.stages[stageIndex].laborVolumes.splice(index, 1);
    },
    deleteGroupElementList(stageIndex, groupIndex, elId) {
      this.data.nir.stages[stageIndex].softwareDevLaborGroups[groupIndex].laborVolumes = this.data
        .nir.stages[stageIndex].softwareDevLaborGroups[groupIndex].laborVolumes
        .filter((el) => el.id !== elId);
    },
  },
};
</script>

<style scoped>
.icon-info {
  color: rgba(117, 117, 117, 0.6);
  font-size: 6vw;
}
.inf-block {
  color: rgba(117, 117, 117, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 24px;
}

</style>
