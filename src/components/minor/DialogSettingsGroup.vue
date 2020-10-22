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
        <v-card-title></v-card-title>
        <v-card-text>
          <v-autocomplete
            v-model="architectureComplexityRate"
            :items="ARCHITECTURE_COMPLEXITY_LIST"
            label="Уровень сложности архитектуры"
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
            label="Уровень сложности инфраструктуры"
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
            label="Уровень инновационных решений"
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
            label="Уровень использования стандартных модулей"
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
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click.stop=""
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
  },
  methods: {
    openDialog() {
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
