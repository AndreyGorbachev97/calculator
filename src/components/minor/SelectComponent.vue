<template>
  <div>
    <v-select
      single-line
      hide-details
      :value="init"
      :items="items"
      rounded
      dense
      filled
      v-on:change="change"
      :placeholder="placeholder"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: 'SelectComponent.vue',
  props: {
    placeholder: String,
    items: Array,
    change: Function,
    init: String,
  },
};
</script>

<style scoped>

</style>
