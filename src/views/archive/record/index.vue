<template>
  <v-container class="bgWht" elevation-4>
    <bread-crumbs :bread-nav="breadNav"></bread-crumbs>
    <list-header title="唱片图鉴" :tips="tips" hasTip></list-header>
    <list-toolbar
      typeName="唱片"
      :config-obj="configObj"
      :search.sync="query"
      :listFilters.sync="filters"
      :sortKey.sync="sortBy"
      :sortVal.sync="sortDesc"
      search-width="600px"
      disableResetBtn
      disableSortBtn
    ></list-toolbar>

    <info-data-list
      ref="dataLists"
      type="record"
      :query="query"
      :configObj="configObj"
      :getListApi="getListApi"
      :filters="filters"
      :sortKey="sortBy"
      :sortVal="sortDesc"
      :listDataProcess="listDataProcess"
      disableDetail
    >
    </info-data-list>
  </v-container>
</template>

<script>
import { getRecords } from '@/api/record'
import ListToolbar from '@/components/core/ListToolbar.vue'

export default {
  components: { ListToolbar },
  name: 'Record',
  data() {
    return {
      getListApi: getRecords,
      query: '',
      filters: {
        channel: [],
      },
      sortBy: 'engName',
      sortDesc: false,
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: '唱片图鉴',
          disabled: true,
          href: '/archive/record',
        },
      ],
      tips: '鼠标移到列表表头的列名上如果出现箭头，就说明该项可以排序。向上箭头是顺序（从小到大），向下箭头是倒序（从大到小）。',
      configObj: {
        sortKeys: [
          { text: '名字', value: 'name' },
          { text: '英文名', value: 'engName' },
        ],
        filtersArr: [{ key: 'channel', text: '筛选唱片来源', multiple: true }],
        selectLists: {
          channelList: [
            { text: 'Nook购物', value: 'Nook购物' },
            { text: 'KK赠送', value: 'KK赠送' },
            { text: '第一次KK演唱会后', value: '第一次KK演唱会后' },
            { text: '生日当天KK赠送', value: '生日当天KK赠送' },
            { text: '隐藏歌曲', value: '隐藏歌曲' },
          ],
        },
        itemPhotoSize: 128,
        headers: [
          {
            text: '主图',
            value: 'photoSrc',
            align: 'center',
            width: '18%',
            sortable: false,
          },
          { text: '名称', value: 'name', width: '15%' },
          { text: '英文名', value: 'engName', width: '14%' },
          { text: '日文名', value: 'jpnName', width: '15%', sortable: false },
          {
            text: '买入价格',
            value: 'price',
            align: 'center',
            width: '10%',
            sortable: false,
          },
          {
            text: '售出价格',
            value: 'salePrice',
            align: 'center',
            width: '10%',
            sortable: false,
          },
          {
            text: '来源',
            value: 'channel',
            align: 'center',
            width: '18%',
            sortable: false,
          },
        ],
      },
    }
  },
  methods: {
    listDataProcess(list) {
      list.forEach(item => {
        item.channel = item.channel ? item.channel.join('/') : ''
      })
    },
  },
}
</script>
