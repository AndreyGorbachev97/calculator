<template>
  <div>
    <v-btn
      x-small
      color="primary"
      icon
      @click.stop="showList()"
    >
      <v-icon>
        mdi-plus-circle-outline
      </v-icon>
    </v-btn>

    <v-dialog
      persistent
      v-model="dialog"
      max-width="800"
    >
      <v-card>
        <v-card-title>{{titleCard}}</v-card-title>
        <v-card-text>
          <v-select
            v-model="software"
            :items="SOFTWARE_LIST"
            rounded
            dense
            filled
            item-text="name"
            item-value="abbr"
            label="Select"
            persistent-hint
            return-object
            single-line
          />
          <v-list class="card-text">
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in laborList"
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
                    {{ item.laborName }}
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
            @click="cancel"
          >
            Отмена
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DialogAddWorksGroup',
  mounted() {
    this.getSoftwareList();
  },
  data() {
    return {
      dialog: false,
      items: [],
      software: {},
      laborList: [],
    };
  },
  props: {
    fullList: Array,
    listSelected: Array,
    groupIndex: Number,
    stageIndex: Number,
    title: String,
    titleCard: String,
    addList: Function,
  },
  watch: {
    software() {
      this.changeSoftware(this.software.id);
    },
  },
  computed: {
    ...mapGetters(['NIR_GROUP_LABOR_LIST', 'SOFTWARE_LIST', 'SOFTWARE_LABOR_LIST']),
    checkboxes() {
      return this.laborList
        .map((el) => this.listSelected.find((selected) => selected.id === el.id));
    },
  },
  methods: {
    ...mapActions(['GET_NIR_GROUP_LABOR_LIST', 'GET_SOFTWARE_LIST', 'GET_SOFTWARE_LABOR_LIST']),
    async changeSoftware(id) {
      await this.GET_SOFTWARE_LABOR_LIST(id);
      this.laborList = this.SOFTWARE_LABOR_LIST;
    },
    async getSoftwareList() {
      await this.GET_SOFTWARE_LIST();
      const temp = this.SOFTWARE_LIST[0];
      this.software = temp;
      console.log(this.software);
      await this.GET_SOFTWARE_LABOR_LIST(this.software.id);
      console.log(this.SOFTWARE_LABOR_LIST);
      this.laborList = this.SOFTWARE_LABOR_LIST;
    },
    saveList() {
      this.addList(this.stageIndex, this.groupIndex, this.listSelected.map((el) => ({
        ...el,
        stageIndex: this.stageIndex,
      })));
      this.dialog = false;
    },
    cancel() {
      this.dialog = false;
      this.listSelected = [];
    },
    showList() {
      this.GET_NIR_GROUP_LABOR_LIST();
      this.dialog = true;
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
    max-height: 55vh;
    overflow-y: auto;
  }
</style>
