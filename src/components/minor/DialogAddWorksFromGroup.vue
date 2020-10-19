<template>
  <div>
    <v-btn
      x-small
      color="primary"
      icon
      @click.stop="openDialog()"
    >
      <v-icon>
        mdi-plus-circle-outline
      </v-icon>
    </v-btn>

    <v-dialog
      persistent
      v-model="dialog"
      max-width="900"
    >
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="6" class="control-block">
              {{titleCard}}
            </v-col>
            <v-col cols="3">
              <v-text-field
                hide-details
                rounded
                dense
                label="Поиск"
                filled
                v-model="search"
                append-icon="mdi-magnify"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-select
                hide-details
                rounded
                dense
                filled
                v-model="itemsPerPage"
                :items="[5, 10, 25]"
                label="Строк на странице"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-data-table
            class="data-table"
            v-model="localListSelected"
            :headers="headers"
            :items="laborVolumes"
            :page.sync="page"
            @page-count="pageCount = $event"
            :items-per-page="itemsPerPage"
            :search="search"
            hide-default-footer
            item-key="id"
            show-select
          >
            <template v-slot:item.laborName="{ item }">
              {{ item.labor.name }}
            </template>
            <template v-slot:item.devEnvName="{ item }">
              <v-chip
                small
                :color="chipСolor[item.devEnv.id]"
                dark
              >
                {{ item.devEnv.name }}
              </v-chip>
            </template>
          </v-data-table>
          <pagination class="mt-2" :change="changePage" :size="pageCount" :page="page - 1"/>
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
import Pagination from './Pagination.vue';

export default {
  name: 'DialogAddWorksGroup',
  mounted() {
    this.getSoftwareList();
  },
  data() {
    return {
      search: '',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      dialog: false,
      items: [],
      software: {},
      laborVolumes: [],
      localListSelected: this.listSelected,
      chipСolor: {
        1: 'error',
        2: 'primary',
        3: 'success',
        4: 'warning',
      },
      headers: [
        {
          text: 'Название',
          align: 'start',
          value: 'laborName',
        },
        {
          text: 'Язык',
          align: 'start',
          value: 'devEnvName',
          width: '35%',
        },
      ],
    };
  },
  props: {
    listSelected: Array,
    groupIndex: Number,
    stageIndex: Number,
    title: String,
    titleCard: String,
    addList: Function,
  },
  components: {
    Pagination,
  },
  computed: {
    ...mapGetters(['NIR_GROUP_LABOR_LIST', 'SOFTWARE_LIST', 'SOFTWARE_LABOR_LIST']),
  },
  methods: {
    ...mapActions(['GET_NIR_GROUP_LABOR_LIST', 'GET_SOFTWARE_LIST', 'GET_SOFTWARE_LABOR_LIST']),
    filterLabor(id) {
      return this.laborVolumes.filter((labor) => labor.devEnvID === id);
    },
    changePage(newPage) {
      if (newPage >= 0 && newPage <= this.pageCount - 1) {
        this.page = newPage + 1;
      }
    },
    async getSoftwareList() {
      await this.GET_SOFTWARE_LIST();
      const temp = this.SOFTWARE_LIST[0];
      this.software = temp;
      await this.GET_SOFTWARE_LABOR_LIST();
      this.laborVolumes = this.SOFTWARE_LABOR_LIST;
    },
    saveList() {
      this.addList(this.stageIndex, this.groupIndex, this.localListSelected.map((el) => ({
        ...el,
        stageIndex: this.stageIndex,
      })));
      this.dialog = false;
    },
    cancel() {
      this.dialog = false;
      this.localListSelected = [];
    },
    openDialog() {
      this.localListSelected = this.listSelected;
      this.dialog = true;
    },
  },
};
</script>

<style scoped>
.data-table  {
  max-height: 52vh;
  overflow-y: auto;
}
.control-block {
  display: flex;
  align-items: center;
}
</style>
