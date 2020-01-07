<template>
  <div id="app">
    <Menu></Menu>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import {
  mapActions,
} from 'vuex';

import Menu from './components/Menu.vue';


@Component({
  components: {
    Menu,
  },

  methods: {
    ...mapActions([
      'fetchData',
    ]),
  },
})

export default class App extends Vue {
  public fetchData!: () => Promise<object[] >;

  public created() {
    return this.fetchData();
  }
}
</script>
