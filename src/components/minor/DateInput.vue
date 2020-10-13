<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        dense
        hide-details
        v-model="date"
        :label="title"
        readonly
        v-bind="attrs"
        v-on="on"
        v-on:change="change(e)"
      ></v-text-field>
    </template>
    <v-date-picker
      locale="ru"
      v-model="date"
      @input="menu = false"
    />
  </v-menu>
</template>

<script>
export default {
  name: 'DateInput',
  props: {
    value: String,
    stageIndex: Number,
    title: String,
  },
  data() {
    return {
      menu: false,
      date: this.value,
    };
  },
  watch: {
    date() {
      this.$emit('changeDate', { date: this.date, stageIndex: this.stageIndex });
    },
  },
  methods: {
    change(e) {
      console.log('e', e);
    },
  },
};
</script>

<style scoped>

</style>
