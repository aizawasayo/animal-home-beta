<template>
  <v-container class="bgWht" elevation-4>
    <bread-crumbs :bread-nav="breadNav"></bread-crumbs>
    <list-header title="岛民图鉴" :tips="tips" hasTip></list-header>
    <info-card-list
      type="islander"
      typeName="岛民"
      :config-obj="configObj"
      :getListApi="getListApi"
      :listFilters.sync="filters"
      :sortKey.sync="sortBy"
      :sortVal.sync="sortDesc"
    >
      <template v-slot:default="{ item }">
        <v-card-title class="subheading font-weight-bold white--text">{{
          item.name + (item.amiibo ? '(amiibo:' + item.amiibo + ')' : '')
        }}</v-card-title>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-img
                :src="realUrl + item.photoSrc"
                height="100"
                contain
              ></v-img>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content
              :class="{
                'cyan--text text--lighten-2': sortBy === 'sex',
              }"
              >性别：</v-list-item-content
            >
            <v-list-item-content class="align-end">{{
              item.sex === 1 ? '♂' : '♀'
            }}</v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content
              :class="{
                'cyan--text text--lighten-2': sortBy === 'character',
              }"
              >性格：</v-list-item-content
            >
            <v-list-item-content class="align-end">{{
              item.character + (item.subtype ? item.subtype : '')
            }}</v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content
              :class="{
                'cyan--text text--lighten-2': sortBy === 'breed',
              }"
              >种族：</v-list-item-content
            >
            <v-list-item-content class="align-end">{{
              item.breed
            }}</v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content
              :class="{
                'cyan--text text--lighten-2': sortBy === 'birth',
              }"
              >生日：</v-list-item-content
            >
            <v-list-item-content class="align-end">{{
              item.birth
            }}</v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>口头禅：</v-list-item-content>
            <v-list-item-content class="align-end">{{
              item.petPhrase
            }}</v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </info-card-list>
  </v-container>
</template>

<script>
import { getIslanders } from '@/api/islander'

export default {
  name: 'Islander',
  data() {
    return {
      getListApi: getIslanders,
      filters: {
        sex: '',
        breed: '',
        monthStr: '',
        character: '',
        voice: '',
        hobby: '',
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
          text: '岛民图鉴',
          disabled: true,
          href: '/archive/islander',
        },
      ],
      tips: '下方工具栏的箭头按钮是根据左侧选择的属性对信息进行排序。向上箭头是顺序（从小到大），向下箭头是倒序（从大到小）。',
      configObj: {
        prominent: true,
        sortKeys: [
          { text: '名字', value: 'name' },
          { text: '生日', value: 'birth' },
          { text: '性格', value: 'character' },
          { text: '种族', value: 'breed' },
        ],
        filtersArr: [
          { key: 'sex', text: '性别' },
          { key: 'breed', text: '种族', multiple: true },
          { key: 'monthStr', text: '生日月份', listKey: 'month' },
          { key: 'character', text: '性格', multiple: true },
          { key: 'voice', text: '音高' },
          { key: 'hobby', text: '爱好' },
        ],
        getOptionKeys: [
          { filterKey: 'breed' },
          { filterKey: 'character' },
          { filterKey: 'voice' },
          { filterKey: 'hobby' },
        ],
        selectLists: {
          sexList: [
            { text: '♀', value: 0 },
            { text: '♂', value: 1 },
          ],
          monthStrList: [
            { text: '一月', value: '1月' },
            { text: '二月', value: '2月' },
            { text: '三月', value: '3月' },
            { text: '四月', value: '4月' },
            { text: '五月', value: '5月' },
            { text: '六月', value: '6月' },
            { text: '七月', value: '7月' },
            { text: '八月', value: '8月' },
            { text: '九月', value: '9月' },
            { text: '十月', value: '10月' },
            { text: '十一月', value: '11月' },
            { text: '十二月', value: '12月' },
          ],
        },
      },
    }
  },
}
</script>

<style lang="scss" scoped></style>
