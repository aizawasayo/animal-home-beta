<template>
  <v-container class="bgWht" elevation-4>
    <bread-crumbs :bread-nav="breadNav"></bread-crumbs>
    <list-header title="森友墙" :tips="tips" hasTip>
      <template v-slot:btn>
        <v-btn class="primary mt-1" to="/community/board/add"
          >发布我的信息</v-btn
        >
      </template>
    </list-header>
    <info-card-list
      type="board"
      typeName="森友墙"
      :config-obj="configObj"
      :getListApi="getListApi"
      :sortKey.sync="sortBy"
      :sortVal.sync="sortDesc"
      disableToolbar
      :itemCol="{ sm: 4 }"
    >
      <template v-slot:default="{ item }">
        <v-card-title class="no-bg d-block">
          <div class="d-flex mb-2">
            <v-avatar class="mr-2" style="flex: none" width="40" height="40">
              <img :src="realUrl + item.user.avatar" />
            </v-avatar>
            <span class="line-40" style="flex: 1">{{
              item.user.nickname
            }}</span>
          </div>
          <div class="subtitle-2 grey--text text--darken-1">
            {{ item.user.position === 'north' ? '北半球' : '南半球' }} |
            {{ item.user.gameId }}
          </div>
          <div class="subtitle-2 grey--text text--lighten-1">
            {{ item.created_time | formatTime }}发布
          </div>
        </v-card-title>
        <v-card-text class="text--primary">
          <div>
            <v-chip
              :color="item.color ? item.color : 'secondary'"
              outlined
              small
              class="mr-2"
            >
              <v-avatar left>
                <v-icon v-if="item.icon"> {{ 'mdi-' + item.icon }}</v-icon>
                <v-icon v-else>mdi-sprout</v-icon>
              </v-avatar>
              {{ item.topic }}
            </v-chip>
            {{ item.content | textFilter(20) }}
            <!-- <span class="cyan--text text--lighten-2 mr-1">[{{ item.topic }}]</span>{{ item.content | textFilter }} -->
          </div>
          <v-img
            v-if="item.photoSrc[0]"
            :src="realUrl + item.photoSrc[0].src"
            class="white--text mt-2 rounded"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          />
          <div class="d-flex justify-space-between">
            <v-btn class="cyan--text text--lighten-2" text
              ><v-icon class="mr-1" small>mdi-thumb-up</v-icon>赞
              {{ item.likes.length ? item.likes.length : '0' }}</v-btn
            >
            <v-btn class="cyan--text text--lighten-2" text
              ><v-icon class="mr-1" small>mdi-comment-processing</v-icon>评论
              {{ item.comments.length ? item.comments.length : '0' }}</v-btn
            >
          </div>
        </v-card-text>
      </template>
    </info-card-list>
  </v-container>
</template>

<script>
import { getBoardList } from '@/api/board'
import { getOptionList } from '@/api/option'

export default {
  name: 'Board',
  data() {
    return {
      getListApi: getBoardList,
      sortBy: 'created_time',
      sortDesc: true,
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: '社区',
          disabled: true,
          href: '/community',
        },
        {
          text: '森友墙',
          disabled: true,
          href: '/community/board',
        },
      ],
      tips: '森友墙用于村民们讨论游戏日常，留下对森友之家的建设意见等等。禁止现金交易，拉私群，违规者永久封禁账号。望发布信息的各位森友遵守规则。',
      configObj: {
        pageArray: [6, 12],
        perPage: 6,
      },
    }
  },
}
</script>
