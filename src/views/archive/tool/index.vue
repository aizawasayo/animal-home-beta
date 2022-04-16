<template>
  <v-container class="bgWht" elevation-4>
    <bread-crumbs :bread-nav="breadNav"></bread-crumbs>
    <list-header title="工具图鉴" :tips="tips" hasTip></list-header>
    <list-toolbar
      typeName="工具"
      :config-obj="configObj"
      :search.sync="query"
      :listFilters.sync="filters"
      search-width="400px"
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
          type="tool"
          :query="query"
          :queryParams="{ isDIY: item.val }"
          :filters="filters"
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
import { getTools } from '@/api/tool'
import ListToolbar from '@/components/core/ListToolbar.vue'

export default {
  name: 'Tool',
  components: {
    ListToolbar,
  },
  data() {
    return {
      getListApi: getTools,
      tab: null,
      tabOptions: [
        { tab: '可以DIY制作', val: true },
        { tab: '不可以DIY制作', val: false },
      ],
      query: '',
      filters: {
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
          text: '工具图鉴',
          disabled: true,
          href: '/archive/clothing',
        },
      ],
      tips: '鼠标移到列表表头的列名上如果出现箭头，就说明该项可以排序。向上箭头是顺序（从小到大），向下箭头是倒序（从大到小）。',
      configObj: {
        filtersArr: [
          { key: 'activity', text: '所属活动', multiple: true },
          { key: 'channels', text: '购买渠道' },
        ],
        getOptionKeys: [
          { filterKey: 'activity' },
          { requestKey: 'toolChannels', filterKey: 'channels' },
        ],
        selectLists: {
          activityList: [],
          channelsList: [],
        },
        headers: [
          {
            text: '主图',
            value: 'photoSrc',
            align: 'center',
            width: '12%',
            sortable: false,
          },
          { text: '名称', value: 'name', width: '14%' },
          {
            text: '英文名',
            value: 'engName',
            align: 'center',
            width: '16%',
            sortable: false,
          },
          {
            text: '日文名',
            value: 'jpnName',
            align: 'center',
            width: '18%',
            sortable: false,
          },
          { text: '价格', value: 'price', align: 'center', width: '10%' },
          {
            text: '耐久度',
            value: 'durability',
            align: 'center',
            width: '10%',
          },
          {
            text: '来源',
            value: 'channels',
            align: 'center',
            width: '20%',
            sortable: false,
          },
        ],
      },
    }
  },
  methods: {
    listDataProcess(list) {
      list.forEach(item => {
        const activity = item.activity ? item.activity + '/' : ''
        item.channels = activity + item.channels.join('/')
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
