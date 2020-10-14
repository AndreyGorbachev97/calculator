<template>
  <div>
    <v-btn
      x-small
      color="primary"
      outlined
      @click.stop="openDialog"
    >
      {{title}}
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
            :items="fullList"
            :page.sync="page"
            @page-count="pageCount = $event"
            :items-per-page="itemsPerPage"
            :search="search"
            hide-default-footer
            item-key="name"
            show-select
          />
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
import Pagination from './Pagination.vue';

export default {
  name: 'DialogForAddingNir',
  data() {
    return {
      search: '',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      dialog: false,
      localListSelected: this.listSelected,
      headers: [
        {
          text: 'Название',
          align: 'start',
          value: 'name',
        },
      ],
    };
  },
  components: {
    Pagination,
  },
  props: {
    fullList: Array,
    listSelected: Array,
    initialListSelected: Array,
    stageIndex: Number,
    title: String,
    addList: Function,
    titleCard: String,
  },
  methods: {
    openDialog() {
      this.localListSelected = this.listSelected;
      this.dialog = true;
    },
    changePage(newPage) {
      if (newPage >= 0 && newPage <= this.pageCount - 1) {
        this.page = newPage + 1;
      }
    },
    saveList() {
      const modList = this.localListSelected.map((el) => ({
        volume: el.volume,
        labor: {
          id: el.id,
          name: el.name,
          code: el.code,
          maxVolume: el.maxVolume,
          minVolume: el.minVolume,
          overMax: el.overMax,
          step: el.step,
        },
      }));
      this.addList(this.stageIndex, modList);
      this.dialog = false;
    },
    cancel() {
      this.localListSelected = this.listSelected;
      this.dialog = false;
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
