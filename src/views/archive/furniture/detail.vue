<template>
  <info-detail
    :breadNav="breadNav"
    :getDetailApi="getDetailApi"
    :dataProcess="dataProcess"
    type="furniture"
  >
    <template v-slot:title="{ title }"
      ><list-header :title="title" :has-tip="false"></list-header
    ></template>
    <template v-slot:default="{ detailInfo, morePhoto }">
      <v-list dense class="pt-8 pb-16">
        <v-row>
          <v-col cols="12" class="py-8">
            <v-list-item>
              <v-list-item-content>
                <v-img
                  v-if="
                    detailInfo.photoSrc.length > 0 && detailInfo.photoSrc[0].src
                  "
                  class="mx-auto"
                  :src="realUrl + detailInfo.photoSrc[0].src"
                  height="180"
                  contain
                />
                <v-img
                  v-else-if="detailInfo.photoSrc.length > 0 && info.photoSrc[0]"
                  class="mx-auto"
                  :src="realUrl + detailInfo.photoSrc"
                  height="180"
                  contain
                />
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
          <v-col v-if="detailInfo.jpnName" cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label">日文名：</v-list-item-content>
              <v-list-item-content class="align-end">{{
                detailInfo.jpnName
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label">类型：</v-list-item-content>
              <v-list-item-content class="align-end">{{
                detailInfo.type.join('/')
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
          <v-col cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >豆狸回收价格：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                detailInfo.price * 0.25
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >箱子回收价格：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                detailInfo.price * 0.2
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >改造类型：</v-list-item-content
              >
              <v-list-item-content class="align-end">
                {{ detailInfo.remould }}
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >订购类型：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                detailInfo.orderType
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >占地尺寸：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                detailInfo.size
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col v-if="detailInfo.series" cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >所属系列：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                detailInfo.series
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="6" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >获取途径：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                detailInfo.channelInfo
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >途径详情：</v-list-item-content
              >
            </v-list-item>
          </v-col>
          <v-col cols="12" class="pt-2 pb-8">
            <v-list-item>
              <v-list-item-content class="align-end">{{
                detailInfo.channelDetail ? detailInfo.channelDetail : '暂无'
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col v-if="morePhoto" cols="12" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >颜色款式：</v-list-item-content
              >
            </v-list-item>
          </v-col>
          <v-col v-if="morePhoto" cols="12" class="py-2 d-flex photoList">
            <v-list-item
              v-for="(photo, i) in detailInfo.photoSrc"
              :key="photo + i"
            >
              <v-img :src="realUrl + photo.src" height="128" contain></v-img>
              <p class="mb-2">{{ photo.name.replace('.png', '') }}</p>
            </v-list-item>
          </v-col>
        </v-row>
      </v-list>
    </template>
  </info-detail>
</template>

<script>
import { getFurniture } from '@/api/furniture'

export default {
  name: 'FurnitureDetail',
  data() {
    return {
      getDetailApi: getFurniture,
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: '家具图鉴',
          href: '/archive/furniture',
        },
      ],
    }
  },
  methods: {
    dataProcess(data) {
      const channelsData = data.channels
      const activity = data.activity ? '[' + data.activity + '期间] ' : ''
      data.channelInfo = activity + channelsData.join('/')
    },
  },
}
</script>

<style lang="scss" scoped></style>
