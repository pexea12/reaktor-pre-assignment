<template>
<div>
  <table
    class="table"
  >
    <thead>
      <tr>
        <th>No.</th>
        <th>Name</th>
        <th>Description</th>
        <th>Dependencies</th>
        <th>Reverse dependencies</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="item in items"
        :key="item.index"
        :id="item.name"
      >
        <th>{{ item.index }}</th>
        <td>
          <a :href="`#${item.name}`">{{ item.name }}</a>
        </td>
        <td v-html="item.description"></td>

        <td>
          <a
            v-for="(fitemId, index) in item.depend_ids"
            :key="fitemId"
            :href="`#${items[fitemId].name}`"
          >
            {{ items[fitemId].name }}{{ index !== item.depend_ids.length - 1 ? ',' : '' }}
          </a>
        </td>
        <td>
          <a
            v-for="(ritemId, index) in item.reverse_depend_ids"
            :key="ritemId"
            :href="`#${items[ritemId].name}`"
          >
            {{ items[ritemId].name }}{{ index !== item.reverse_depend_ids.length - 1 ? ',' : '' }}
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import { mapState } from 'vuex';


@Component({
  computed: {
    ...mapState({
      items: (state) => state.items,
    }),
  },
})

export default class TableView extends Vue {

}
</script>

<style>
:target {
  -webkit-animation: target-fade 1s;
  -moz-animation: target-fade 1s;
  -o-animation: target-fade 1s;
  animation: target-fade 1s;
}

@-webkit-keyframes target-fade {
  from { background-color: yellow; }
  to { background-color: transparent; }
}

@-moz-keyframes target-fade {
  from { background-color: yellow; }
  to { background-color: transparent; }
}

@-o-keyframes target-fade {
  from { background-color: yellow; }
  to { background-color: transparent; }
}

@keyframes target-fade {
  from { background-color: yellow; }
  to { background-color: transparent; }
}
</style>
