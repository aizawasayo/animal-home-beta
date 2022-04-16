<template>
  <info-card-list
    type="fish"
    typeName="鱼类"
    :config-obj="configObj"
    :getListApi="getListApi"
    :listFilters.sync="filters"
    :sortKey.sync="sortBy"
    :sortVal.sync="sortDesc"
    search-width="450px"
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
                {{ item.locale.join('、') }}</v-list-item-content
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
                  'cyan--text text--lighten-2': sortBy === 'shadow',
                }"
                >鱼影：</v-list-item-content
              >
            </v-col>
            <v-col cols="8" class="py-0">
              <v-list-item-content class="align-end">{{
                item.shadow
              }}</v-list-item-content>
            </v-col>
          </v-row>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-col cols="4" class="py-0"
              ><v-list-item-content
                :class="{
                  'cyan--text text--lighten-2': sortBy === 'rarity',
                }"
                >稀有度：</v-list-item-content
              ></v-col
            >
            <v-col cols="8" class="py-0"
              ><v-list-item-content class="align-end">{{
                item.rarity
              }}</v-list-item-content></v-col
            >
          </v-row>
        </v-list-item>
      </v-list>
    </template>
  </info-card-list>
</template>

<script>
import { getFishes } from '@/api/fish'

export default {
  name: 'Fish',
  data() {
    return {
      getListApi: getFishes,
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
          { text: '稀有度', value: 'rarity' },
        ],
        filtersArr: [
          { key: 'locale', text: '场所', multiple: true },
          { key: 'shadow', text: '鱼影大小', multiple: true },
          { key: 'rarity', text: '稀有度' },
        ],
        getOptionKeys: [
          { requestKey: 'fishLocale', filterKey: 'locale' },
          { filterKey: 'shadow' },
          { filterKey: 'rarity' },
        ],
        selectLists: {},
        resetRight: true,
      },
    }
  },
}
</script>

<style lang="scss" scoped></style>
