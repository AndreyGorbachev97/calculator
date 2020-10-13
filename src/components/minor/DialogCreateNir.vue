<template>
  <div>
    <v-btn
      x-small
      class="ml-2"
      color="primary"
      @click.stop="dialog = true"
    >
      создать
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="950"
    >
      <v-card v-if="dialog">
        <v-card-title>Создание НИР</v-card-title>
        <v-card-text class="card-text">
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col class="cols" cols="12">
                <v-text-field
                  v-model="name"
                  :rules="[(v) => !!v || 'Введите название']"
                  label="Название"
                ></v-text-field>
              </v-col>
              <v-col class="cols" cols="3">
                <v-text-field
                  type="number"
                  v-model="duration"
                  :rules="[(v) => !!v || 'Укажите продолжительность']"
                  label="Продолжительность в месяцах"
                ></v-text-field>
              </v-col>
              <v-col class="cols" cols="3">
                <v-menu
                  v-model="menuFrom"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateFrom"
                      label="Действует с:"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="ru"
                    v-model="dateFrom"
                    @input="menuFrom = false"
                  />
                </v-menu>
              </v-col>
              <v-col class="cols" cols="3">
                <v-menu
                  v-model="menuTo"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateTo"
                      label="Действует до:"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="ru"
                    v-model="dateTo"
                    @input="menuTo = false"
                  />
                </v-menu>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  readonly
                  v-model="intensiveRate"
                  :rules="[(v) => !!v || 'Не может быть 0']"
                  label="Интенсивность работ:"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="createNir"
            :disabled="!valid"
          >
            Создать
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
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';
import sortListInnovationRate from '../../utils/helpers';

export default {
  name: 'DialogCreateNir.vue',
  mounted() {
    this.GET_LIST_NIR_INNOVATION_RATE();
  },
  data() {
    const date = new Date();
    const firstDate = new Date();
    const lastDate = date.setFullYear(date.getFullYear() + 1);
    return {
      valid: true,
      name: '',
      duration: 12,
      menuFrom: false,
      menuTo: false,
      dateFrom: firstDate.toISOString().substr(0, 10),
      dateTo: moment(lastDate).format('YYYY-MM-DD'),
      dialog: false,
    };
  },
  computed: {
    ...mapGetters(['LIST_NIR_INNOVATION_RATE', 'CREATED_NIR_ID']),
    intensiveRate() {
      const currentDuration = Math
        .round(((new Date(this.dateTo) - new Date(this.dateFrom)) / (60 * 60 * 24 * 1000)) / 30.33);
      if (currentDuration && Number(this.duration)) {
        const res = (Number(this.duration) / currentDuration).toFixed(3);
        if (res > 1.2) return 1.2;
        if (res < 0.8) return 0.8;
        return res;
      }
      return 0;
    },
    sortListLabor() {
      return sortListInnovationRate(this.LIST_NIR_INNOVATION_RATE);
    },
  },
  methods: {
    ...mapActions(['GET_LIST_NIR_INNOVATION_RATE', 'CREATE_NIR']),
    async createNir() {
      await this.CREATE_NIR({
        name: this.name,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        intensiveRateValue: this.intensiveRate,
        analogDurationMonthes: this.duration,
      });
      this.$router.push(`/list-nir/edit/${this.CREATED_NIR_ID}`);
      this.dialog = false;
    },
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
