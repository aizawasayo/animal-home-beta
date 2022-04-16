<template>
  <info-card-list
    type="insect"
    typeName="昆虫"
    :config-obj="configObj"
    :getListApi="getListApi"
    :listFilters.sync="filters"
    :sortKey.sync="sortBy"
    :sortVal.sync="sortDesc"
    search-width="450px"
    :listDataProcess="listDataProcess"
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
              <v-list-item-content>场所：</v-list-item-content>
            </v-col>
            <v-col cols="8" class="py-0">
              <v-list-item-content class="align-end">
                {{ item.locale | textFilter(8) }}</v-list-item-content
              >
            </v-col>
          </v-row>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-col cols="4" class="py-0">
              <v-list-item-content>时间段：</v-list-item-content>
            </v-col>
            <v-col cols="8" class="py-0">
              <v-list-item-content class="align-end">{{
                item.period === '1点-24点' ? '全天' : item.period
              }}</v-list-item-content>
            </v-col>
          </v-row>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-col cols="4" class="py-0">
              <v-list-item-content
                :class="{
                  'cyan--text text--lighten-2': sortBy === 'rarity',
                }"
                >稀有度：</v-list-item-content
              >
            </v-col>
            <v-col cols="8" class="py-0">
              <v-list-item-content class="align-end">{{
                item.rarity
              }}</v-list-item-content>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </template>
  </info-card-list>
</template>

<script>
import { getInsects } from '@/api/insect'

export default {
  name: 'Insect',
  data() {
    return {
      getListApi: getInsects,
      filters: {
        locale: [],
        rarity: '',
        unlockCondition: '',
      },
      sortBy: 'name',
      sortDesc: false,
      configObj: {
        prominent: true,
        sortKeys: [
          { text: '名字', value: 'name' },
          { text: '价格', value: 'price' },
          { text: '解锁条件', value: 'unlockCondition' },
          { text: '稀有度', value: 'rarity' },
        ],
        filtersArr: [
          { key: 'locale', text: '场所', multiple: true },
          { key: 'rarity', text: '稀有度' },
          { key: 'unlockCondition', text: '解锁条件' },
        ],
        getOptionKeys: [
          { requestKey: 'insectLocale', filterKey: 'locale' },
          { filterKey: 'rarity' },
          { requestKey: 'insectUnlock', filterKey: 'unlockCondition' },
        ],
        selectLists: {},
        resetRight: true,
      },
    }
  },
  methods: {
    listDataProcess(list) {
      list.forEach(item => {
        let elseData = ''
        item.elseCondition.forEach((e, i) => {
          elseData += '(' + e + ')'
        })
        item.locale = item.locale.join('、') + elseData
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
