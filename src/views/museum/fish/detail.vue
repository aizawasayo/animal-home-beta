<template>
  <info-detail
    :breadNav="breadNav"
    :getDetailApi="getDetailApi"
    :dataProcess="dataProcess"
    type="fish"
  >
    <template v-slot:title="{ title }"
      ><list-header :title="title" :has-tip="false"></list-header
    ></template>
    <template v-slot:default="{ detailInfo }">
      <v-list dense class="pt-8 pb-16">
        <v-row>
          <v-col cols="12" class="py-8">
            <v-list-item>
              <v-list-item-content>
                <v-img
                  :src="realUrl + detailInfo.photoSrc"
                  height="128"
                  contain
                ></v-img>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label">英文名：</v-list-item-content>
              <v-list-item-content class="align-end">{{
                detailInfo.engName
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label">日文名：</v-list-item-content>
              <v-list-item-content class="align-end">{{
                detailInfo.jpnName
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label">价格：</v-list-item-content>
              <v-list-item-content class="align-end">{{
                detailInfo.price
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="6" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >北半球月份：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                detailInfo.north
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="6" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >南半球月份：</v-list-item-content
              >
              <v-list-item-content class="align-end">
                {{ detailInfo.south }}
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="3" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >出现场所：</v-list-item-content
              >
              <v-list-item-content class="align-end">
                {{
                  detailInfo.locale && detailInfo.locale.join('、')
                }}</v-list-item-content
              >
            </v-list-item>
          </v-col>
          <v-col cols="3" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >出现时间段：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                detailInfo.period === '1点-24点' ? '全天' : detailInfo.period
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="3" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >鱼影大小：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                detailInfo.shadow
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col v-if="detailInfo.unlockCondition" cols="6" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >解锁条件：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                detailInfo.unlockCondition
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="6" class="py-2">
            <v-list-item>
              <v-list-item-content class="label">稀有度：</v-list-item-content>
              <v-list-item-content class="align-end">{{
                detailInfo.rarity
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" class="py-2">
            <v-list-item>
              <v-list-item-content class="label">简介：</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" class="pt-2 pb-8">
            <v-list-item>
              <v-list-item-content class="align-end">{{
                detailInfo.introduction ? detailInfo.introduction : '暂无'
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-list>
    </template>
  </info-detail>
</template>

<script>
import { getFish } from '@/api/fish'

export default {
  name: 'FishDetail',
  data() {
    return {
      getDetailApi: getFish,
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: '博物馆图鉴',
          href: '/archive/museum',
        },
        {
          text: '鱼类',
          href: '/archive/museum/fish',
        },
      ],
    }
  },
  methods: {
    dataProcess(data) {
      const northData = data.activeTime.north
      const southData = data.activeTime.south
      let northText = ''
      let southText = ''
      if (northData.includes('全年')) {
        northText = '全年'
      } else {
        northText = northData.join()
      }
      if (southData.includes('全年')) {
        southText = '全年'
      } else {
        southText = southData.join()
      }
      data.north = northText
      data.south = southText
    },
  },
}
</script>

<style lang="scss" scoped></style>
