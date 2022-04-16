<template>
  <v-container class="bgWht" elevation-4>
    <bread-crumbs :bread-nav="breadNav"></bread-crumbs>
    <list-header title="植物图鉴" :tips="tips" hasTip></list-header>

    <list-toolbar
      typeName="植物"
      :config-obj="configObj"
      :search.sync="query"
      :listFilters.sync="filters"
      search-width="400px"
      disableSortBtn
    ></list-toolbar>

    <info-data-list
      ref="dataLists"
      type="plant"
      :query="query"
      :configObj="configObj"
      :getListApi="getListApi"
      :filters="filters"
      :listDataProcess="listDataProcess"
      disableDetail
    >
    </info-data-list>
  </v-container>
</template>

<script>
import { getPlants } from '@/api/plant'

export default {
  name: 'Plant',
  data() {
    return {
      getListApi: getPlants,
      query: '',
      filters: {
        type: [],
        channel: '',
      },
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: '植物图鉴',
          disabled: true,
          href: '/archive/plant',
        },
      ],
      tips: '鼠标移到列表表头的列名上如果出现箭头，就说明该项可以排序。向上箭头是顺序（从小到大），向下箭头是倒序（从大到小）。',
      configObj: {
        filtersArr: [
          { key: 'type', text: '筛选种类' },
          { key: 'channel', text: '筛选来源' },
        ],
        selectLists: {
          typeList: [
            { text: '种子', value: '种子' },
            { text: '水果', value: '水果' },
            { text: '树苗', value: '树苗' },
            { text: '树', value: '树' },
            { text: '花', value: '花' },
            { text: '蘑菇', value: '蘑菇' },
            { text: '灌木', value: '灌木' },
            { text: '其他', value: '其他' },
          ],
          channelList: [
            { text: '种子', value: '种子' },
            { text: '花卉杂交', value: '花卉杂交' },
          ],
        },
        headers: [
          {
            text: '主图',
            value: 'photoSrc',
            align: 'center',
            width: '20%',
            sortable: false,
          },
          { text: '名称', value: 'name', width: '18%' },
          { text: '价格', value: 'price', align: 'center', width: '10%' },
          {
            text: '种类',
            value: 'type',
            align: 'center',
            width: '10%',
            sortable: false,
          },
          {
            text: '来源',
            value: 'channel',
            align: 'center',
            width: '12%',
            sortable: false,
          },
          {
            text: '成长阶段',
            value: 'growStage',
            align: 'center',
            width: '30%',
            sortable: false,
          },
        ],
      },
    }
  },
  methods: {
    listDataProcess(list) {
      list.forEach(item => {
        item.type = item.type.join('/')
        item.growStage = item.growStage.join('-')
      })
    },
  },
}
</script>
