<template>
  <div class="pagination" v-if="size > 1">
    <v-btn
      icon
      color="primary"
      :disabled="page === 0"
      @click="change(0)"
    >
      <v-icon>mdi-chevron-double-left</v-icon>
    </v-btn>
    <v-btn
      icon
      color="primary"
      :disabled="page === 0"
      @click="change(page - 1)"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <div class="pagination-text">
      {{` ${page + 1} of ${size}`}}
    </div>
    <v-btn
      icon
      color="primary"
      :disabled="page >= size - 1"
      @click="change(page + 1)"
    >
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
    <v-btn
      icon
      color="primary"
      :disabled="page >= size - 1"
      @click="change(size - 1)"
    >
      <v-icon>mdi-chevron-double-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    change: Function,
    size: Number,
    page: Number,
  },
};
</script>

<style scoped>
  .pagination {
    display: flex;
    justify-content: center;
  }
  .pagination-text {
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 0 5px;
    color: #9b9b9b;
  }
</style>
