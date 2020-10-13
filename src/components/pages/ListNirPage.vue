<template>
  <div>
    <v-card class="card">
      <v-card-text>
        <data-table
          title="Список НИР"
          :headers="headers"
          :items="NIR_LIST"
          editLink="/list-nir/edit"
          dialogCreate="DialogCreateNir"
          :actions="{
            delete: DELETE_NIR,
          }"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DataTable from '../minor/DataTable.vue';

export default {
  name: 'ListNirPage',
  mounted() {
    this.GET_NIR_LIST();
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: 'Название',
          align: 'start',
          value: 'name',
        },
        { text: 'Продолжительность в месяцах', align: 'center', value: 'analogDurationMonthes' },
        { text: 'Интенсивность работ', align: 'center', value: 'intensiveRateValue' },
        // { text: 'Действует с', value: 'dateFrom' },
        // { text: 'Действует до', value: 'dateTo' },
        { text: 'Дата создания', value: 'createTime' },
        {
          text: 'Действия',
          value: 'actions',
          align: 'end',
          sortable: false,
        },
      ],
    };
  },
  components: {
    DataTable,
  },
  computed: mapGetters(['NIR_LIST']),
  methods: {
    ...mapActions(['GET_NIR_LIST', 'DELETE_NIR']),
  },
};

</script>

<style scoped>
.card {
  height: 95vh;
}
</style>
