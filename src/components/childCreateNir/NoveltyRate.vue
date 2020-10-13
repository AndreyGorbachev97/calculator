<template>
  <v-row class="ma-2">
    <v-col cols="3">
      <v-row>
        <v-col class="header center border-left border-top" cols="12">
          Характеристика новизны
        </v-col>
        <v-col class="cell border-left" cols="12">
          Работа в развитии предшевтсвующей
        </v-col>
        <v-col class="cell border-left" cols="12">
          Работа с известным аналогом
        </v-col>
        <v-col class="cell border-left" cols="12">
          Работа, не имеющая известных аналогов
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="9">
      <v-row>
        <v-col class="cell center border-top" cols="12">
          Коффициент новизны Кн НИР
        </v-col>
        <v-col class="cell center" cols="4">
          Фундоментальная НИР
        </v-col>
        <v-col class="cell center" cols="4">
          Прикладная НИР, с разработкой и изготовлением ЭО или макета
        </v-col>
        <v-col class="cell center" cols="4">
          Прикладная НИР, без создания ЭО или макета
        </v-col>
        <v-col
          class="cell center"
          v-for="(item, i) in listLabor" :key="i"
          cols="4"
        >
          <v-btn
            v-bind:class="{ btn: nirInnovationRateID === item.id }"
            @click="saveInnovationRate(item, stageId)"
            color="primary"
            style="height: 100%; width: 100%"
            text
          >
            {{item.value}}
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'NoveltyRate',
  props: {
    saveInnovationRate: Function,
    listLabor: Array,
    nirInnovationRateID: Number,
    stageId: Number,
  },
};
</script>

<style scoped>
.btn {
  background-color: rgba(25, 118, 210, 0.1);
}
.cell {
  height: 70px;
  padding: 3px;
  border-bottom: 1px solid rgba(146, 146, 146, 0.3);
  border-right: 1px solid rgba(146, 146, 146, 0.3);
}
.header {
  height: 140px;
  padding: 3px;
  border-bottom: 1px solid rgba(146, 146, 146, 0.3);
  border-right: 1px solid rgba(146, 146, 146, 0.3);
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.border-left {
  border-left: 1px solid rgba(146, 146, 146, 0.3);
}
.border-top {
  border-top: 1px solid rgba(146, 146, 146, 0.3);
}
</style>
