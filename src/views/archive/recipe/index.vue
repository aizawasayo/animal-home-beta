<template>
  <v-container class="bgWht" elevation-4>
    <bread-crumbs :bread-nav="breadNav"></bread-crumbs>
    <list-header title="DIY配方图鉴" :tips="tips" hasTip></list-header>

    <list-toolbar
      typeName="DIY配方"
      :config-obj="configObj"
      :search.sync="query"
      :listFilters.sync="filters"
      search-width="600px"
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
          type="recipe"
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
import { getRecipes } from '@/api/recipe'
import { getOptionList } from '@/api/option'

export default {
  name: 'Recipe',
  data() {
    return {
      getListApi: getRecipes,
      tab: null,
      tabOptions: [],
      query: '',
      filters: {
        size: '', // 尺寸
        season: [], // 所属系列
        activity: '',
        character: '', // 来源村民性格
        npc: '',
        channels: [], // 获取途径
        unlockCondition: '',
      },
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: 'DIY配方图鉴',
          disabled: true,
          href: '/archive/recipe',
        },
      ],
      tips: '鼠标移到列表表头的列名上如果出现箭头，就说明该项可以排序。向上箭头是顺序（从小到大），向下箭头是倒序（从大到小）。',
      configObj: {
        prominent: true,
        filtersArr: [
          { key: 'size', text: '尺寸', multiple: true },
          { key: 'activity', text: '所属活动', multiple: true },
          { key: 'season', text: '所属季节', multiple: true },
          { key: 'channels', text: '获取来源', multiple: true },
          { key: 'npc', text: '来源NPC', multiple: true },
          { key: 'character', text: '来源岛民性格', multiple: true },
        ],
        getOptionKeys: [
          { filterKey: 'size' },
          { filterKey: 'activity' },
          { requestKey: 'diyChannels', filterKey: 'channels' },
          { filterKey: 'character' },
          { filterKey: 'season' },
        ],
        selectLists: {
          sizeList: [],
          channelsList: [],
          activityList: [],
          characterList: [],
          seasonList: [],
          npcList: [
            { text: '狸克', value: '狸克' },
            { text: '西施惠', value: '西施惠' },
            { text: '傅珂', value: '傅珂' },
            { text: '傅达', value: '傅达' },
            { text: '雪人', value: '雪人' },
            { text: '巴猎', value: '巴猎' },
            { text: '蹦蹦', value: '蹦蹦' },
            { text: '健兆', value: '健兆' },
            { text: '阿獭', value: '阿獭' },
          ],
        },
        headers: [
          {
            text: '主图',
            value: 'photoSrc',
            align: 'center',
            width: '12%',
            sortable: false,
          },
          { text: '名称', value: 'name', width: '12%' },
          { text: '尺寸', value: 'size', align: 'center', width: '8%' },
          {
            text: '来源',
            value: 'channels',
            align: 'center',
            width: '25%',
            sortable: false,
          },
          {
            text: '合成材料',
            value: 'materials',
            align: 'center',
            width: '28%',
            sortable: false,
          },
          {
            text: '解锁条件',
            value: 'unlockCondition',
            align: 'center',
            width: '12%',
          },
        ],
      },
    }
  },
  created() {
    getOptionList({ type: 'diyType' }).then(res => {
      res.data.forEach(item => this.tabOptions.push({ tab: item.name }))
    })
  },
  methods: {
    listDataProcess(list) {
      list.forEach(item => {
        let channels = ''
        const season = item.season ? item.season + '/' : ''
        const activity = item.activity ? item.activity + '/' : ''
        const character = item.character ? `(${item.character}性格)` : ''
        const channelData = item.channels
        const npc = item.npc ? `(${item.npc})` : ''

        channelData.forEach((c, i) => {
          if (c === '岛民' || c === 'NPC') {
            c = c + '赠送'
          }
          if (i === channelData.length - 1) {
            channels += c
          } else {
            channels += c + '/'
          }
        })
        item.channels = season + activity + character + channels + npc

        let materials = ''
        for (let m of item.materials) {
          materials += `${m.name}*${m.num}+`
        }
        item.materials = materials.substring(0, materials.length - 1)

        item.unlockCondition = item.unlockCondition
          ? `总DIY数量满${item.unlockCondition}次`
          : '无要求'
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
