<template>
  <v-card class="elevation-2">
    <v-card-title
      style="position: relative; display: flex; justify-content: space-between"
    >
      <v-row>
        <v-col style="display: flex; align-items: center" cols="9">
          <div>Этап {{i + 1}}</div>
          <dialog-add-works
            class="ml-2 mb-1"
            title="добавить работы"
            :fullList="listLabor"
            :listSelected="[...item.list]"
            :stageIndex="i"
            titleCard="Список работ"
            :addList="addListLabor"
          />
          <div>
            <dialog-add-groups
              title="добавить группы работ"
              titleCard="Список групп работ"
              :fullList="listGroup"
              :listSelected="[...item.groups]"
              :stageIndex="i"
              :addList="addListGroup"
            />
          </div>
          <v-btn class="ml-2" color="primary" :disabled="!valid" x-small>сохранить</v-btn>
        </v-col>
        <v-col cols="3" style="display: flex; align-items: center; justify-content: flex-end">
          <v-chip outlined color="success">
            <v-avatar left>
              <v-icon>mdi-cash-multiple</v-icon>
            </v-avatar>
            15 + 24 = 76
          </v-chip>
          <v-btn
            class="ml-2"
            v-if="i === stages.length - 1 & i !== 0"
            icon
            @click="deleteStage"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text >
      <div v-if="item.list[0] || item.groups[0]">
        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th style="width: 75%" class="text-left">Виды работ</th>
              <th style="width: 20%" class="text-left">Трудоемкость</th>
              <th class="text-left">Действия</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(el, j) in item.list" :key="j">
              <td >{{ el.name }}</td>
              <td style="display: flex; align-items: center">
                <v-slider
                  style="width: 80%"
                  :step="el.step"
                  tick-size="3"
                  ticks="always"
                  :min="el.minVolume"
                  :max="el.overMax"
                  :color="colorSlider(el.maxVolume, item.list[j].volume)"
                  track-color="grey"
                  dense
                  single-line
                  hide-details
                  thumb-label
                  v-model="item.list[j].volume"
                >
                  <template v-slot:thumb-label="{ value }">
                    {{ value.toFixed(3) }}
                  </template>
                </v-slider>
                <div class="pl-1" style="width: 20%">{{el.volume.toFixed(2)}}</div>
              </td>
              <td>
                <v-btn @click="deleteElementList(i, el.id)" icon x-small color="error">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
        <h4 v-if="item.groups[0]" class="mt-5">Группы работ:</h4>
        <v-expansion-panels
          flat
          multiple
          hover
          accordion
          focusable
        >
          <v-expansion-panel
            :readonly="!group.list[0]" v-for="(group, j) in item.groups"
            :key="j"
          >
            <v-expansion-panel-header>
              <div>
                <div style="display: flex" class="mb-2">
                  <dialog-add-works-from-group
                    :activeClass="false"
                    title="добавить работы"
                    titleCard="Список работ"
                    :listSelected="[...item.groups[j].list]"
                    :stageIndex="i"
                    :groupIndex="j"
                    :groupId="group.id"
                    :addList="addListLaborToGroup"
                  />
                  <v-btn
                    @click.stop="deleteGroup(i, group.id)"
                    class="ml-2"
                    x-small
                    outlined
                    color="error"
                  >
                    Удалить группу
                  </v-btn>
                </div>
                {{group.name}}
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-simple-table>
                <template>
                  <thead>
                  <tr>
                    <th style="width: 75%" class="text-left">Виды работ</th>
                    <th style="width: 20%" class="text-left">Трудоемкость</th>
                    <th class="text-left">Действия</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(labor, key) in group.list" :key="key">
                    <td >{{labor.name}}</td>
                    <td >test1</td>
                    <td >test2</td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-expansion-panel-content>
            <v-divider v-if="j !== item.groups.length - 1"/>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div
        v-else
        class="ma-3 mb-6 inf-block"
      >
        <v-icon class="icon-info">mdi-playlist-plus</v-icon>
        <div style="display: flex; justify-content: center">
          Добавьте работы
        </div>

      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Stage',
};
</script>

<style scoped>

</style>
