<template>
  <v-container class="bgWht" elevation-4>
    <bread-crumbs :bread-nav="breadNav"></bread-crumbs>
    <list-header title="菜市场" :tips="tips" hasTip>
      <template v-slot:btn>
        <v-btn class="primary mt-1" to="/community/turnip/add"
          >发布我的大头菜信息</v-btn
        >
      </template>
    </list-header>
    <info-card-list
      type="turnip"
      typeName="菜市场"
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
            <span style="flex: 1" class="line-40">{{
              item.user.nickname
            }}</span>
          </div>
          <div class="subtitle-2 grey--text text--darken-1">
            {{ item.user.position === 'north' ? '北半球' : '南半球' }} |
            {{ item.user.gameId }}
          </div>
          <div class="subtitle-2 grey--text text--lighten-1">
            剩余时间：{{ item.validTime | formatTime }}
          </div>
        </v-card-title>
        <v-card-text class="text--primary">
          <div class="d-flex justify-lg-space-between">
            <v-chip
              :color="item.exchangeType === '我有菜' ? 'primary' : 'secondary'"
              text-color="white"
            >
              <v-avatar left>
                <v-icon v-if="item.exchangeType === '我有价'"
                  >mdi-currency-usd-circle</v-icon
                >
                <v-icon v-else>mdi-sprout</v-icon>
              </v-avatar>
              {{ item.exchangeType }}
            </v-chip>
            <div class="subtitle-1 grey--text text--darken-1 line-40">
              菜价：{{ item.price }}
            </div>
          </div>
          <div class="my-2">{{ item.detail | textFilter(25) }}</div>
          <div v-if="item.contactDetail" class="">
            <span class="grey--text text--lighten-1 mr-2">联系方式:</span
            >{{ item.contact + '---' + item.contactDetail }}
          </div>
          <div v-if="item.psw">
            <span class="grey--text text--lighten-1 mr-2">开岛密码:</span
            >{{ item.psw }}
          </div>
          <div class="d-flex justify-space-between">
            <v-btn class="cyan--text text--lighten-2" text
              ><v-icon class="mr-1" small>mdi-contactless-payment-circle</v-icon
              >{{ item.isLineup ? '立即上岛' : '立即联系' }}</v-btn
            >
            <v-btn class="cyan--text text--lighten-2" text
              ><v-icon class="mr-1" small>mdi-comment-processing</v-icon>留言
              {{ item.comments ? item.comments.length : '0' }}</v-btn
            >
          </div>
        </v-card-text>
      </template>
    </info-card-list>
  </v-container>
</template>

<script>
import { getTurnipList } from '@/api/turnip'

export default {
  name: 'Turnip',
  data() {
    return {
      getListApi: getTurnipList,
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
          text: '菜市场',
          disabled: true,
          href: '/community/turnip',
        },
      ],
      tips: '菜市场用于村民们互助卖菜，大家可以留下自己的商店菜价等相关信息。禁止现金交易，拉私群，违规者永久封禁账号。望发布信息的各位森友遵守规则。',
      configObj: {
        pageArray: [6, 12],
        perPage: 6,
      },
    }
  },
}
</script>
