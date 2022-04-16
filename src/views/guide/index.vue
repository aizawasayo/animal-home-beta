<template>
  <v-container class="bgWht" elevation-4>
    <bread-crumbs :bread-nav="breadNav"></bread-crumbs>
    <list-header title="动森攻略" :hasTip="false"></list-header>
    <info-card-list
      type="guide"
      typeName="攻略"
      :config-obj="configObj"
      :getListApi="getListApi"
      :listFilters.sync="filters"
      :sortKey.sync="sortBy"
      :sortVal.sync="sortDesc"
      disableToolbar
      :itemCol="{ sm: 4 }"
    >
      <template v-slot:default="{ item }">
        <v-img
          :src="realUrl + item.image_uri"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="240px"
        >
          <v-card-title class="no-bg" v-text="item.title"></v-card-title>
        </v-img>
        <v-card-text class="text--primary">
          <div>
            <span class="cyan--text text--lighten-2 mr-1"
              >[{{ item.platforms[0] }}]</span
            >{{ item.content_short | textFilter }}
            <!-- <span class="float-right grey--text text--lighten-1">{{ item.display_time | parseTime('{y}-{m}-{d}') }}</span> -->
          </div>
        </v-card-text>
      </template>
    </info-card-list>
  </v-container>
</template>

<script>
import { getGuideList } from '@/api/guide'

export default {
  name: 'Guide',
  data() {
    return {
      getListApi: getGuideList,
      filters: {
        status: 'published',
      },
      sortBy: 'display_time',
      sortDesc: false,
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: '动森攻略',
          disabled: true,
          href: '/guide/',
        },
      ],
      configObj: {
        pageArray: [3, 6, 9],
        perPage: 6,
      },
    }
  },
}
</script>
