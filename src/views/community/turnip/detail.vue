<template>
  <info-detail
    :breadNav="breadNav"
    :getDetailApi="getDetailApi"
    type="turnip"
    hasInteract
    comment-default="想进行大头菜交易可以留言哦～"
    breadText="菜市场详情"
  >
    <template v-slot:title="{ title }"
      ><list-header :title="title" :has-tip="false"></list-header
    ></template>
    <template v-slot:default="{ detailInfo }">
      <v-list dense class="py-16 px-16">
        <v-row>
          <v-col cols="12 d-flex justify-space-between">
            <div v-if="detailInfo.user" class="d-flex mb-2">
              <v-avatar class="mr-2" width="40" height="40">
                <img :src="realUrl + detailInfo.user.avatar" />
              </v-avatar>
              <span style="flex: 1; line-height: 40px">{{
                detailInfo.user.nickname
              }}</span>
              <div class="line-40 subtitle-2 px-4 grey--text text--darken-1">
                {{ detailInfo.user.position === 'north' ? '北半球' : '南半球' }}
                | {{ detailInfo.user.gameId }} |
                {{ detailInfo.user.islandName }}
              </div>
            </div>
            <div class="line-40 subtitle-2 px-4 grey--text text--lighten-1">
              剩余时间：{{ detailInfo.validTime | formatTime }}
            </div>
          </v-col>
          <v-col cols="12" class="py-10">
            <div class="mx-auto px-10">
              <v-chip
                :color="
                  detailInfo.exchangeType === '我有菜' ? 'primary' : 'secondary'
                "
                text-color="white"
              >
                <v-avatar left>
                  <v-icon v-if="detailInfo.exchangeType === '我有价'"
                    >mdi-currency-usd-circle</v-icon
                  >
                  <v-icon v-else>mdi-sprout</v-icon>
                </v-avatar>
                {{ detailInfo.exchangeType }}
              </v-chip>
              {{ detailInfo.detail }}
            </div>
          </v-col>
          <v-col cols="12">
            <div class="d-flex justify-space-between">
              <div class="line-40">
                <span class="grey--text text--lighten-1 mr-2">菜价：</span
                >{{ detailInfo.price }}
              </div>
              <div class="line-40">
                <span class="grey--text text--lighten-1 mr-2"
                  >登岛人数限制：</span
                >{{ detailInfo.maxPeople }}
              </div>
              <div class="line-40">
                <span class="grey--text text--lighten-1 mr-2"
                  >登岛最长时间（分钟）：</span
                >{{ detailInfo.maxTime }}
              </div>
            </div>
            <div class="d-flex justify-start line-40">
              <div v-if="detailInfo.contactDetail" class="">
                <span class="grey--text text--lighten-1 mr-2">联系方式:</span
                >{{ detailInfo.contact + '---' + detailInfo.contactDetail }}
              </div>
              <div v-if="detailInfo.psw">
                <span class="grey--text text--lighten-1 mr-2">开岛密码:</span>
                {{ detailInfo.psw }}
              </div>
              <v-btn class="cyan--text text--lighten-2 line-40 ml-2" text>
                <v-icon class="mr-1" small
                  >mdi-contactless-payment-circle</v-icon
                >{{ detailInfo.isLineup ? '立即上岛' : '立即联系' }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-list>
    </template>
  </info-detail>
</template>

<script>
import { getTurnip } from '@/api/turnip'

export default {
  name: 'TurnipDetail',
  data() {
    return {
      getDetailApi: getTurnip,
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: '菜市场',
          href: '/community/turnip/',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.detail {
  .v-list-item__content {
    &.align-end {
      border-bottom: none;
    }
  }
}
</style>
