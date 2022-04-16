<template>
  <info-card-list
    type="halobios"
    typeName="海洋生物"
    :config-obj="configObj"
    :getListApi="getListApi"
    :listFilters.sync="filters"
    :sortKey.sync="sortBy"
    :sortVal.sync="sortDesc"
    search-width="600px"
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
          <v-list-item-content
            :class="{
              'cyan--text text--lighten-2': sortBy === 'price',
            }"
            >价格：</v-list-item-content
          >
          <v-list-item-content class="align-end">{{
            item.price
          }}</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>场所：</v-list-item-content>
          <v-list-item-content class="align-end">{{
            item.locale.join('、')
          }}</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>时间段：</v-list-item-content>
          <v-list-item-content class="align-end">{{
            item.period === '1点-24点' ? '全天' : item.period
          }}</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content
            :class="{
              'cyan--text text--lighten-2': sortBy === 'shadow',
            }"
            >鱼影：</v-list-item-content
          >
          <v-list-item-content class="align-end">{{
            item.shadow
          }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </info-card-list>
</template>

<script>
import { getHalobiosList } from '@/api/halobios'

export default {
  name: 'Halobios',
  data() {
    return {
      getListApi: getHalobiosList,
      filters: {
        locale: [],
        shadow: '',
        rarity: '',
      },
      sortBy: 'name',
      sortDesc: false,
      configObj: {
        prominent: true,
        sortKeys: [
          { text: '名字', value: 'name' },
          { text: '价格', value: 'price' },
          { text: '鱼影大小', value: 'shadow' },
        ],
        filtersArr: [
          { key: 'locale', text: '场所', multiple: true },
          { key: 'shadow', text: '鱼影大小', multiple: true },
          { key: 'unlockCondition', text: '解锁条件' },
        ],
        getOptionKeys: [
          { requestKey: 'halobiosLocale', filterKey: 'locale' },
          { requestKey: 'halobiosShadow', filterKey: 'shadow' },
          { requestKey: 'halobiosUnlock', filterKey: 'unlockCondition' },
        ],
        selectLists: {},
        resetRight: true,
      },

      localeList: [],
      shadowList: [],
      unlockList: [],
    }
  },
}
</script>

<style lang="scss" scoped></style>
