<template>
  <v-container class="bgWht" elevation-4>
    <bread-crumbs :bread-nav="breadNav"></bread-crumbs>
    <list-header title="服饰图鉴" :tips="tips" hasTip></list-header>
    <list-toolbar
      typeName="服饰"
      :config-obj="configObj"
      :search.sync="query"
      :listFilters.sync="filters"
      search-width="450px"
      disableSortBtn
    ></list-toolbar>

    <v-tabs
      v-model="tab"
      background-color="transparent"
      class="elevation-0 table-tab"
    >
      <v-tab v-for="item in tabOptions" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, i) in tabOptions" :key="item.tab + i">
        <info-data-list
          ref="dataLists"
          type="clothing"
          :query="query"
          :queryParams="{ type: item.tab }"
          :filters.sync="filters"
          :configObj="configObj"
          :getListApi="getListApi"
          :listDataProcess="listDataProcess"
        >
        </info-data-list>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { getClothingList } from '@/api/clothing'
import { getOptionList } from '@/api/option'

export default {
  name: 'Clothing',
  data() {
    return {
      getListApi: getClothingList,
      tab: null,
      tabOptions: [],
      query: '',
      filters: {
        color: [], // 颜色
        style: [], // 风格
        theme: [], // 主题
        orderType: '',
        activity: '',
        channels: [],
      },
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: '服饰图鉴',
          disabled: true,
          href: '/archive/clothing',
        },
      ],
      tips: '鼠标移到列表表头的列名上如果出现箭头，就说明该项可以排序。向上箭头是顺序（从小到大），向下箭头是倒序（从大到小）。',
      configObj: {
        prominent: true,
        filtersArr: [
          { key: 'color', text: '筛选颜色', multiple: true },
          { key: 'style', text: '筛选风格', multiple: true },
          { key: 'theme', text: '筛选主题', multiple: true },
          { key: 'activity', text: '所属活动', multiple: true },
          { key: 'channels', text: '购买渠道', multiple: true },
          { key: 'orderType', text: '订购类型' },
        ],
        getOptionKeys: [
          { requestKey: 'clothingColor', filterKey: 'color' },
          { requestKey: 'clothingStyle', filterKey: 'style' },
          { requestKey: 'clothingTheme', filterKey: 'theme' },
          { requestKey: 'clothingChannels', filterKey: 'channels' },
          { filterKey: 'activity' },
        ],
        selectLists: {
          colorList: [],
          styleList: [],
          themeList: [],
          channelsList: [],
          activityList: [],
          orderTypeList: [
            { text: '订购', value: '订购' },
            { text: '不可订购', value: '不可订购' },
            { text: '里数兑换', value: '里数兑换' },
            { text: '非卖品', value: '非卖品' },
          ],
        },
        headers: [
          {
            text: '主图',
            value: 'photoSrc',
            align: 'center',
            width: '13%',
            sortable: false,
          },
          { text: '名称', value: 'name', width: '20%' },
          { text: '颜色', value: 'color', sortable: false, width: '25%' },
          { text: '价格', value: 'price', align: 'center', width: '10%' },
          {
            text: '豆狸回收',
            value: 'douPrice',
            align: 'center',
            width: '10%',
            sortable: false,
          },
          {
            text: '箱子回收',
            value: 'boxPrice',
            align: 'center',
            width: '10%',
            sortable: false,
          },
          {
            text: '订购类型',
            value: 'orderType',
            align: 'center',
            width: '12%',
            sortable: false,
          },
        ],
      },
    }
  },
  created() {
    getOptionList({ type: 'clothingType' }).then(res => {
      res.data.forEach(item => this.tabOptions.push({ tab: item.name }))
    })
  },
  methods: {
    listDataProcess(list) {
      list.forEach(item => {
        item.douPrice = Math.ceil(item.price * 0.25)
        item.boxPrice = Math.ceil(item.price * 0.2)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.card-search .v-select {
}
</style>
