<template>
  <v-container class="bgWht" elevation-4>
    <bread-crumbs :bread-nav="breadNav"></bread-crumbs>
    <list-header title="家具图鉴" :tips="tips" hasTip></list-header>
    <list-toolbar
      typeName="家具"
      :config-obj="configObj"
      :search.sync="query"
      :listFilters.sync="filters"
      search-width="500px"
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
          type="furniture"
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
import { getFurnitureList } from '@/api/furniture'
import { getOptionList } from '@/api/option'

export default {
  name: 'Furniture',
  data() {
    return {
      getListApi: getFurnitureList,
      tab: null,
      tabOptions: [],
      query: '',
      filters: {
        remould: '', // 能否改造
        orderType: '', // 订购类型
        size: '', // 尺寸
        series: '', // 所属系列
        activity: '',
        channels: [], // 获取途径
      },
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: '家具图鉴',
          disabled: true,
          href: '/archive/furniture',
        },
      ],
      tips: '鼠标移到列表表头的列名上如果出现箭头，就说明该项可以排序。向上箭头是顺序（从小到大），向下箭头是倒序（从大到小）。',
      configObj: {
        prominent: true,
        filtersArr: [
          { key: 'orderType', text: '订购类型' },
          { key: 'remould', text: '能否改造', multiple: true },
          { key: 'size', text: '筛选尺寸', multiple: true },
          { key: 'series', text: '筛选系列', multiple: true },
          { key: 'activity', text: '所属活动', multiple: true },
          { key: 'channels', text: '获取渠道', multiple: true },
        ],
        getOptionKeys: [
          { filterKey: 'size' },
          { filterKey: 'series' },
          { requestKey: 'furnitureChannels', filterKey: 'channels' },
          { filterKey: 'activity' },
        ],
        selectLists: {
          sizeList: [],
          seriesList: [],
          activityList: [],
          channelsList: [],
          orderTypeList: [
            { text: '订购', value: '订购' },
            { text: '不可订购', value: '不可订购' },
            { text: '里数兑换', value: '里数兑换' },
            { text: '非卖品', value: '非卖品' },
          ],
          remouldList: [
            { text: '可改造', value: '可改造' },
            { text: '不可改造', value: '不可改造' },
            { text: '多颜色', value: '多颜色' },
          ],
        },
        headers: [
          {
            text: '主图',
            value: 'photoSrc',
            align: 'center',
            width: '15%',
            sortable: false,
          },
          { text: '名称', value: 'name', width: '16%' },
          {
            text: '能否改造',
            value: 'remould',
            align: 'center',
            width: '14%',
            sortable: false,
          },
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
          { text: '尺寸', value: 'size', align: 'center', width: '10%' },
          {
            text: '订购类型',
            value: 'orderType',
            align: 'center',
            width: '15%',
            sortable: false,
          },
        ],
      },
    }
  },
  created() {
    getOptionList({ type: 'furnitureType' }).then(res => {
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

<style lang="scss" scoped></style>
