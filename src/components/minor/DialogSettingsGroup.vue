<template>
  <div>
    <v-btn
      x-small
      color="primary"
      icon
      @click.stop="openDialog()"
    >
      <v-icon>
        mdi-cog-outline
      </v-icon>
    </v-btn>

    <v-dialog
      persistent
      v-model="dialog"
      max-width="900"
    >
      <v-card>
        <v-card-title>
          Настройка коэффициентов группы
           <v-spacer />
            <v-chip class="ml-3" outlined color="success">
            <v-avatar left>
              <v-icon>mdi-cash-multiple</v-icon>
            </v-avatar>
            {{`${architectureComplexityRate.value} x ${infrastructureComplexityRate.value} x
            ${solutionInnovationRate.value} x ${standardModulesUsingRate.value} x
            ${testsDevelopmentRate.value} = ${volume.toFixed(3)}`}}
          </v-chip>
        </v-card-title>
        <v-card-text>
          <v-autocomplete
            v-model="architectureComplexityRate"
            :items="ARCHITECTURE_COMPLEXITY_LIST"
            label="Сложность разработки под программную архитектуру решения"
            :item-text="(obj) =>
            `${obj.componentsInteractionArchitectureName} ${obj.componentsMakroArchitectureName}`"
            :item-value="(obj) => obj"
          >
            <template v-slot:selection="data">
              <div class="list-item">
                {{`${data.item.componentsInteractionArchitectureName}
                ${data.item.componentsMakroArchitectureName.toLowerCase()} архитектура`}}
                <v-chip class="ml-2" small color="primary">{{data.item.value}}</v-chip>
              </div>
            </template>
            <template v-slot:item="data">
              <template>
                  <v-list-item-content>
                    <v-row>
                      <v-col cols="8">
                        {{data.item.componentsInteractionArchitectureName}}
                      </v-col>
                      <v-col cols="3">
                        <v-chip
                          class="ml-2"
                          small
                          :color="chipСolor[data.item.componentsMakroArchitectureID]"
                        >
                          {{data.item.componentsMakroArchitectureName}}
                        </v-chip>
                      </v-col>
                      <v-col cols="1">
                        {{data.item.value}}
                      </v-col>
                    </v-row>
                  </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
          <v-autocomplete
            v-model="infrastructureComplexityRate"
            :items="INFRASTRUCTURE_COMPLEXITY_LIST"
            label="Сложность инфраструктуры разработки и функционирования"
            :item-text="(obj) => obj.name"
            :item-value="(obj) => obj"
          >
            <template v-slot:selection="data">
              <div class="list-item">
                {{data.item.name}}
                <span>
                  <v-chip class="ml-2" small color="primary">{{data.item.value}}</v-chip>
                </span>
              </div>
            </template>
             <template v-slot:item="data">
              <v-row style="width: 600px">
                <v-col cols="10">
                  {{data.item.name}}
                </v-col>
                <v-col cols="1">
                  {{data.item.value}}
                </v-col>
              </v-row>
            </template>
          </v-autocomplete>

          <v-autocomplete
            v-model="solutionInnovationRate"
            :items="SOLUTION_INNOVATION_LIST"
            label="Новизна решения"
            :item-text="(obj) => obj.name"
            :item-value="(obj) => obj"
          >
            <template v-slot:selection="data">
              <div class="list-item">
                {{data.item.name}}
                <span>
                  <v-chip class="ml-2" small color="primary">{{data.item.value}}</v-chip>
                </span>
              </div>
            </template>
             <template v-slot:item="data">
              <v-row style="width: 600px">
                <v-col cols="10">
                  {{data.item.name}}
                </v-col>
                <v-col cols="1">
                  {{data.item.value}}
                </v-col>
              </v-row>
            </template>
          </v-autocomplete>

          <v-autocomplete
            v-model="standardModulesUsingRate"
            :items="STANDARD_MODULES_USING_LIST"
            label="Степень использования стандартных модулей"
            :item-text="(obj) => obj.name"
            :item-value="(obj) => obj"
          >
            <template v-slot:selection="data">
              <div class="list-item">
                {{data.item.name}}
                <span>
                  <v-chip class="ml-2" small color="primary">{{data.item.value}}</v-chip>
                </span>
              </div>
            </template>
             <template v-slot:item="data">
              <v-row style="width: 600px">
                <v-col cols="10">
                  {{data.item.name}}
                </v-col>
                <v-col cols="1">
                  {{data.item.value}}
                </v-col>
              </v-row>
            </template>
          </v-autocomplete>

          <v-autocomplete
            v-model="testsDevelopmentRate"
            :items="TESTS_DEVELOPMENT_LIST"
            label="Сложность разработки программных тестов и тестопригодного кода"
            :item-text="(obj) => obj.testsCoverageLevelName"
            :item-value="(obj) => obj"
          >
            <template v-slot:selection="data">
              <div class="list-item">
                {{data.item.testsCoverageLevelName}}
                <span>
                  <v-chip class="ml-2" small color="primary">{{data.item.value}}</v-chip>
                </span>
              </div>
            </template>
             <template v-slot:item="data">
              <v-row style="width: 600px">
                <v-col cols="3">
                  {{data.item.componentsMicroArchitectureName}}
                </v-col>
                <v-col cols="3">
                   <v-chip
                    class="ml-2"
                    small
                    :color="chipСolor[data.item.testsScaleID]"
                  >
                    {{data.item.testsScaleName}}
                  </v-chip>
                </v-col>
                <v-col cols="3">
                  {{data.item.testsCoverageLevelName}}
                </v-col>
                <v-col cols="3">
                  {{data.item.value}}
                </v-col>
              </v-row>
            </template>
          </v-autocomplete>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click.stop="save"
          >
            Далее
          </v-btn>
          <v-btn
            color="primary"
            text
            @click.stop="dialog = false"
          >
            Отмена
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DialogSettingsGroup',
  props: {
    architectureComplexityRateID: Number,
    infrastructureComplexityRateID: Number,
    standardModulesUsingRateID: Number,
    testsDevelopmentRateID: Number,
    solutionInnovationRateID: Number,
    indexStage: Number,
    indexGroup: Number,
    addSettingsGroup: Function,
    addCoefficient: Function,
  },
  watch: {
    architectureComplexityRateID() {
      console.log('update architecture');
    },
  },
  data() {
    return {
      dialog: false,
      architectureComplexityRate: {},
      infrastructureComplexityRate: {},
      solutionInnovationRate: {},
      standardModulesUsingRate: {},
      testsDevelopmentRate: {},
      chipСolor: {
        1: 'error',
        2: 'primary',
        3: 'success',
        4: 'warning',
      },
    };
  },
  computed: {
    ...mapGetters([
      'ARCHITECTURE_COMPLEXITY_LIST',
      'INFRASTRUCTURE_COMPLEXITY_LIST',
      'SOLUTION_INNOVATION_LIST',
      'STANDARD_MODULES_USING_LIST',
      'TESTS_DEVELOPMENT_LIST',
    ]),
    volume() {
      return this.architectureComplexityRate.value
      * this.infrastructureComplexityRate.value
      * this.solutionInnovationRate.value
      * this.standardModulesUsingRate.value
      * this.testsDevelopmentRate.value;
    },
  },
  methods: {
    save() {
      this.addSettingsGroup(this.indexStage, this.indexGroup, {
        architectureComplexityRateID: this.architectureComplexityRate.id,
        architectureComplexityRateValue: this.architectureComplexityRate.value,
        infrastructureComplexityRateID: this.infrastructureComplexityRate.id,
        infrastructureComplexityRateValue: this.infrastructureComplexityRate.value,
        solutionInnovationRateID: this.solutionInnovationRate.id,
        solutionInnovationRateValue: this.solutionInnovationRate.value,
        standardModulesUsingRateID: this.standardModulesUsingRate.id,
        standardModulesUsingRateValue: this.standardModulesUsingRate.value,
        testsDevelopmentRateID: this.testsDevelopmentRate.id,
        testsDevelopmentRateValue: this.testsDevelopmentRate.value,
      });
      this.addCoefficient(this.indexStage, this.indexGroup, this.volume);
      this.dialog = false;
    },
    openDialog() {
      this.architectureComplexityRate = this.ARCHITECTURE_COMPLEXITY_LIST
        .find((el) => el.id === this.architectureComplexityRateID);
      this.infrastructureComplexityRate = this.INFRASTRUCTURE_COMPLEXITY_LIST
        .find((el) => el.id === this.infrastructureComplexityRateID);
      this.solutionInnovationRate = this.SOLUTION_INNOVATION_LIST
        .find((el) => el.id === this.solutionInnovationRateID);
      this.standardModulesUsingRate = this.STANDARD_MODULES_USING_LIST
        .find((el) => el.id === this.standardModulesUsingRateID);
      this.testsDevelopmentRate = this.TESTS_DEVELOPMENT_LIST
        .find((el) => el.id === this.testsDevelopmentRateID);
      this.dialog = true;
    },
  },
};
</script>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  width: 90%;
}
</style>
