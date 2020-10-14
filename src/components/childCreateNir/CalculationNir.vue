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
              <v-col style="display: flex; align-items: center" cols="8">
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
              <v-col cols="4" style="display: flex; align-items: center; justify-content: flex-end">
                <v-chip class="text-medium" outlined color="success">
                  <v-avatar left>
                    <v-icon>mdi-cash-multiple</v-icon>
                  </v-avatar>
                  {{`${(sumLabor[i]).toFixed(3)} x
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
            <dialog-add-works
              class="ml-2 mb-3"
              title="добавить работы"
              :fullList="listLabor"
              :listSelected="[...item.laborVolumes]"
              :stageIndex="i"
              titleCard="Список работ"
              :addList="addListLabor"
            />
            <div v-if="item.laborVolumes[0]">
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
                      Коффициент новизны:
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
                      Объем работ:
                      <v-icon
                        v-if="!sumLabor[i]"
                        class="ml-2"
                        color="warning"
                      >
                        mdi-alert-circle
                      </v-icon>
                      <div v-else class="text-medium ml-2">{{sumLabor[i].toFixed(3)}}</div>
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
                            <v-btn @click="deleteElementList(i, el.id)" icon x-small color="error">
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
              <v-divider />
              <dialog-add-groups
                class="mt-3 mb-3"
                title="добавить группы работ"
                :fullList="listGroup"
                :listSelected="[...item.groups]"
                :stageIndex="i"
                titleCard="Список групп работ"
                :addList="addListGroup"
              />
              <v-expansion-panels
                flat
                multiple
                hover
                accordion
                focusable
              >
                <v-expansion-panel v-for="(group, j) in item.groups" :key="j">
                  <v-expansion-panel-header >
                    <div style="display: flex; align-items: center">
                      <div class="text-medium" style="max-width: 70%">
                        {{group.name}}
                      </div>
                      <v-icon
                        v-if="!item.nirInnovationRateValue"
                        class="ml-2"
                        color="warning"
                      >
                        mdi-alert-circle
                      </v-icon>
                      <div v-else class="text-medium ml-2">{{item.nirInnovationRateValue}}</div>
                      <v-spacer />
                      <dialog-add-works-from-group
                        :listSelected="group.listLabor"
                        :stageIndex="i"
                        :groupIndex="j"
                        titleCard="Список работ"
                        :addList="addListLaborToGroup"
                      />
                      <v-btn @click.stop="" class="ma-2" icon x-small color="error">
                        <v-icon>mdi-delete-outline</v-icon>
                      </v-btn>
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
                            <v-btn @click="deleteElementList(i, el.id)" icon x-small color="error">
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
            <div
              v-else
              class="ma-3 mb-6 inf-block"
            >
              <v-icon class="icon-info">mdi-playlist-plus</v-icon>
              <div class="text-bold" style="display: flex; justify-content: center">
                Добавьте работы
              </div>

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
  },
  data() {
    return {
      valid: true,
      stages: this.data.nir ? this.data.nir.stages : [],
      modifiedDate: '',
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
    sumLabor() {
      return this.data.nir.stages
        .map((stage) => stage.laborVolumes.reduce((acc, el) => acc + el.volume, 0));
    },
    volumeLaborStages() {
      return this.data.nir.stages.map((stage, i) => {
        if (stage.nirInnovationRateValue) {
          return stage.nirInnovationRateValue * this.sumLabor[i];
        }
        return 0;
      });
    },
    volumeNir() {
      return this.volumeLaborStages.reduce((acc, el) => acc + el, 0);
    },
  },
  methods: {
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
        });
      }
      this.actions.getNirCurrent(this.data.nirId);
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
          nirInnovationRateValue: 0,
          volume: 0,
        },
      ];
    },
    addListLabor(index, list) {
      this.data.nir.stages[index].laborVolumes = list;
    },
    addListGroup(index, groups) {
      this.data.nir.stages[index].groups = groups.map((el) => ({
        ...el,
        listLabor: [],
      }));
    },
    addListLaborToGroup(indexStage, indexGroup, list) {
      console.log('list', list);
      this.data.nir.stages[indexStage].groups[indexGroup].listLabor = list;
    },
    deleteStage(id) {
      this.data.nir.stages.pop();
      if (id) this.actions.deleteStage(id);
    },
    deleteGroup(indexStage, idGroup) {
      this.stages[indexStage].groups = this.stages[indexStage].groups
        .filter((el) => el.id !== idGroup);
    },
    deleteElementList(stageId, elementId) {
      const index = this.data.nir.stages[stageId].laborVolumes
        .findIndex((el) => el.id === elementId);
      this.data.nir.stages[stageId].laborVolumes.splice(index, 1);
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
