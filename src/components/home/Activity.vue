<template>
  <v-card>
    <v-card-title class="white--text">
      <v-icon left> mdi-ticket </v-icon>
      <span class="title font-weight-bold">活动汇总</span>
    </v-card-title>
    <v-card-text class="pt-4">
      <v-simple-table fixed-header height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left text-subtitle-2">活动名称</th>
              <th class="text-left text-subtitle-2">所属半球</th>
              <th class="text-left text-subtitle-2">时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in activity" :key="item.name + i">
              <td class="cyan--text text--lighten-2">{{ item.name }}</td>
              <td>
                <span v-for="(pos, i) in item.position" :key="pos + i">{{
                  i === item.position.length - 1 ? pos : pos + '/'
                }}</span>
              </td>
              <td>{{ item.duration }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { getOptionList } from '@/api/option'
export default {
  data() {
    return {
      queryInfo: {
        type: 'activity',
      },
      activity: [],
    }
  },
  computed: {},
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getOptionList(this.queryInfo).then(response => {
        this.activity = response.data
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.theme--light.v-data-table {
  background-color: transparent;
}
.theme--light.v-data-table.v-data-table--fixed-header thead th {
  background: transparent;
}
</style>
