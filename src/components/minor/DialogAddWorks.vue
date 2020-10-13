<template>
  <div>
    <v-btn
      x-small
      color="primary"
      outlined
      @click.stop="dialog = true"
    >
      {{title}}
    </v-btn>

    <v-dialog
      persistent
      v-model="dialog"
      max-width="800"
    >
      <v-card>
        <v-card-title>{{titleCard}}</v-card-title>
        <v-card-text class="card-text">
          <v-list nav>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in fullList"
                :key="i"
              >
                <v-list-item-content
                  style="padding: 0"
                >
                  <div style="display: flex; align-items: center">
                    <v-checkbox
                      v-model="checkboxes[i]"
                      @click="modList(item)"
                      class="ml-2 mr-2"
                      dense
                    ></v-checkbox>
                    {{ item.name }}
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="saveList"
          >
            Далее
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Отмена
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'DialogForAddingNir',
  data() {
    return {
      dialog: false,
      list: [],
    };
  },
  props: {
    fullList: Array,
    listSelected: Array,
    groupIndex: Number,
    stageIndex: Number,
    title: String,
    addList: Function,
    titleCard: String,
  },
  computed: {
    checkboxes() {
      return this.fullList
        .map((el) => this.listSelected.find((selected) => selected.labor.id === el.id));
    },
  },
  methods: {
    saveList() {
      if (this.groupIndex === undefined) {
        this.addList(this.stageIndex, this.listSelected);
      } else {
        this.addList(this.stageIndex, this.groupIndex, this.listSelected.map((el) => ({
          ...el,
          stageIndex: this.stageIndex,
        })));
      }
      this.dialog = false;
    },
    modList(item) {
      const index = this.listSelected.findIndex((el) => el.labor.id === item.id);
      if (index >= 0) {
        this.listSelected.splice(index, 1);
      } else {
        const modItem = {
          volume: item.volume,
          labor: {
            id: item.id,
            name: item.name,
            code: item.code,
            maxVolume: item.maxVolume,
            minVolume: item.minVolume,
            overMax: item.overMax,
            step: item.step,
          },
        };
        this.listSelected.push(modItem);
      }
    },
  },
};
</script>

<style scoped>
.card-text  {
  max-height: 72vh;
  overflow-y: auto;
}
</style>
