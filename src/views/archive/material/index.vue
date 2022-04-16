<template>
  <v-container class="bgWht" elevation-4>
    <bread-crumbs :bread-nav="breadNav"></bread-crumbs>
    <list-header title="素材图鉴" :tips="tips" hasTip></list-header>
    <list-toolbar
      typeName="素材"
      :config-obj="configObj"
      :search.sync="query"
      :listFilters.sync="filters"
      :sortKey.sync="sortBy"
      :sortVal.sync="sortDesc"
      disableSortBtn
    ></list-toolbar>
    <info-data-list
      ref="dataLists"
      type=" material"
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
import { getMaterials } from '@/api/material'

export default {
  name: 'Material',
  data() {
    return {
      getListApi: getMaterials,
      query: '',
      filters: {
        activity: '',
        season: [],
        channels: [],
      },
      sortBy: 'name',
      sortDesc: false,
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: '素材图鉴',
          disabled: true,
          href: '/archive/material',
        },
      ],
      tips: '鼠标移到列表表头的列名上如果出现箭头，就说明该项可以排序。向上箭头是顺序（从小到大），向下箭头是倒序（从大到小）。',
      configObj: {
        filtersArr: [
          { key: 'season', text: '筛选所属季节' },
          { key: 'activity', text: '筛选所属活动', multiple: true },
          { key: 'channels', text: '筛选材料来源', multiple: true },
        ],
        getOptionKeys: [{ filterKey: 'season' }, { filterKey: 'activity' }],
        selectLists: {
          seasonList: [],
          activityList: [],
          channelsList: [
            { text: '商店购买', value: '商店购买' },
            { text: '狸端机订购', value: '狸端机订购' },
            { text: '岛民赠送', value: '岛民赠送' },
            { text: 'npc赠送', value: 'npc赠送' },
            { text: '素材岛挖掘', value: '素材岛挖掘' },
            { text: '花卉杂交', value: '花卉杂交' },
            { text: '星座当月许愿', value: '星座当月许愿' },
            { text: '对流星许愿次日', value: '对流星许愿次日' },
            { text: '海滩拾取', value: '海滩拾取' },
            { text: '海滩喷水处挖掘', value: '海滩喷水处挖掘' },
            { text: '树边采集', value: '树边采集' },
            { text: '砍树掉落', value: '砍树掉落' },
            { text: '摇晃树干', value: '摇晃树干' },
            { text: '砍竹子', value: '砍竹子' },
            { text: '敲石头', value: '敲石头' },
            { text: '钓鱼', value: '钓鱼' },
            { text: '挖掘地面', value: '挖掘地面' },
            { text: '打落气球', value: '打落气球' },
            { text: '果树掉落', value: '果树掉落' },
            { text: '非果树掉落', value: '非果树掉落' },
            { text: '针叶树掉落', value: '针叶树掉落' },
            { text: '阔叶树掉落', value: '阔叶树掉落' },
            { text: '打落蓝色气球', value: '打落蓝色气球' },
            { text: '捕虫网捕捉', value: '捕虫网捕捉' },
            { text: '潜水打捞', value: '潜水打捞' },
            {
              text: '与阿獭交换帆立贝随机获得',
              value: '与阿獭交换帆立贝随机获得',
            },
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
          { text: '名称', value: 'name', width: '20%' },
          { text: '价格', value: 'price', align: 'center', width: '15%' },
          {
            text: '最大堆叠数量',
            value: 'maxNum',
            align: 'center',
            width: '15%',
          },
          {
            text: '获取来源',
            value: 'source',
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
        const seasonData = item.season
        const activity = item.activity ? item.activity + '/' : ''
        const channelData = item.channels
        item.source = seasonData.join('/') + activity + channelData.join('/')
      })
    },
  },
}
</script>
