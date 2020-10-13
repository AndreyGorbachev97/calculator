/* eslint eqeqeq:0 */
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  options: {
    customProperties: true,
  },
  theme: {
    dark: false,
    themes: {
      light: {
        background: '#eeeeee',
      },
      dark: {
        background: '#121212',
      },
    },
  },
});
