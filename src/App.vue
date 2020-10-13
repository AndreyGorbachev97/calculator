<template>
  <v-app>
    <v-main :style="{background: $vuetify.theme.themes[theme].background}">
      <div style="display: flex">
        <drawer style="min-width: 330px" class="hidden-sm-and-down"/>
        <div style="width: 100%; padding: 1% 4%">
          <router-view/>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Drawer from './components/minor/NavBar.vue';

export default {
  name: 'App',

  components: {
    Drawer,
  },
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light';
    },
  },
  data: () => ({
    drawer: true,
  }),
};
</script>

<style lang="scss">

</style>
