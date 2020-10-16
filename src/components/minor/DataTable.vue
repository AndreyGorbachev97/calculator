<template>
  <div>
    <v-row>
      <v-col cols="6" style="display: flex; align-items: center">
        <h2>{{ title }}</h2>
        <div :is="dialogCreate"></div>
      </v-col>
      <v-col cols="4">
        <v-text-field
          single-line
          hide-details
          rounded
          dense
          placeholder="Поиск"
          filled
          v-model="search"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <select-component
          :items="['2', '5', '10', '25']"
          :init="itemsPerPage.toString()"
          :change="(payload) => (itemsPerPage = Number(payload))"
        />
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="items"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :search="search"
      hide-default-footer
      @page-count="pageCount = $event"
    >
      <template v-slot:item.name="{ item }">
        <a :href="`list-nir/edit/${item.id}`">{{item.name}}</a>
      </template>
      <template v-slot:item.actions="{ item }">
        <div v-if="item.createTime">
          <v-btn :to="`${editLink}/${item.id}`" class="mr-1" icon>
            <v-icon>mdi-table-edit</v-icon>
          </v-btn>
          <v-btn @click.stop="actions.delete(item.id)" class="mr-1" icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <pagination :change="changePage" :size="pageCount" :page="page - 1" />
    </div>
  </div>
</template>

<script>
import Pagination from './Pagination.vue';
import SelectComponent from './SelectComponent.vue';
import DialogCreateNir from './DialogCreateNir.vue';

export default {
  name: 'DataTable',
  props: {
    title: String,
    headers: Array,
    items: Array,
    editLink: String,
    dialogCreate: String,
    actions: Object,
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: '',
    };
  },
  components: {
    Pagination,
    SelectComponent,
    DialogCreateNir,
  },
  methods: {
    changePage(newPage) {
      if (newPage >= 0 && newPage <= this.pageCount - 1) {
        this.page = newPage + 1;
      }
    },
  },
};
</script>

<style scoped>
.dataTable {
  height: 100%;
}
</style>
