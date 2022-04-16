<template>
  <info-card-list
    type="fossil"
    typeName="化石"
    :config-obj="configObj"
    :getListApi="getListApi"
    :sortKey.sync="sortBy"
    :sortVal.sync="sortDesc"
    search-width="450px"
    disableResetBtn
  >
    <template v-slot:default="{ item }">
      <v-card-title class="subheading font-weight-bold white--text">{{
        item.name
      }}</v-card-title>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-img :src="realUrl + item.photoSrc" height="100" contain></v-img>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-col cols="4" class="py-0">
              <v-list-item-content
                :class="{
                  'cyan--text text--lighten-2': sortBy === 'price',
                }"
                >价格：</v-list-item-content
              >
            </v-col>
            <v-col cols="8" class="py-0">
              <v-list-item-content class="align-end">{{
                item.price
              }}</v-list-item-content>
            </v-col>
          </v-row>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-col cols="4" class="py-0">
              <v-list-item-content>英文名：</v-list-item-content>
            </v-col>
            <v-col cols="8" class="py-0">
              <v-list-item-content class="align-end">
                {{ item.engName }}</v-list-item-content
              >
            </v-col>
          </v-row>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-col cols="4" class="py-0">
              <v-list-item-content>日文名：</v-list-item-content>
            </v-col>
            <v-col cols="8" class="py-0">
              <v-list-item-content class="align-end">{{
                item.jpnName | textFilter(8)
              }}</v-list-item-content>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </template>
  </info-card-list>
</template>

<script>
import { getFossils } from '@/api/fossil'

export default {
  name: 'Fossil',
  data() {
    return {
      getListApi: getFossils,
      sortBy: 'name',
      sortDesc: false,
      configObj: {
        sortKeys: [
          { text: '名字', value: 'name' },
          { text: '价格', value: 'price' },
        ],
      },
    }
  },
}
</script>

<style lang="scss" scoped></style>
