<template>
  <div>
    <v-btn
      x-small
      class="ml-2 mb-1"
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
                <v-list-item-content style="padding: 0">
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
  name: 'DialogAddGroup',
  data() {
    return {
      dialog: false,
      items: [],
    };
  },
  props: {
    fullList: Array,
    listSelected: Array,
    stageIndex: Number,
    title: String,
    addList: Function,
    titleCard: String,
  },
  computed: {
    checkboxes() {
      return this.fullList
        .map((el) => this.listSelected.find((selected) => selected.id === el.id));
    },
  },
  methods: {
    saveList() {
      this.addList(this.stageIndex, this.listSelected.map((el) => ({
        ...el,
        stageIndex: this.stageIndex,
      })));
      this.dialog = false;
    },
    modList(item) {
      const index = this.listSelected.findIndex((el) => el.id === item.id);
      if (index >= 0) {
        this.listSelected.splice(index, 1);
      } else {
        this.listSelected.push(item);
      }
    },
  },
};
</script>

<style scoped>
  .card-text  {
    max-height: 700px;
    overflow-y: auto;
  }
</style>
