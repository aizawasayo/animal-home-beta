<template>
  <info-detail
    :breadNav="breadNav"
    :getDetailApi="getDetailApi"
    :dataProcess="dataProcess"
    type="artwork"
  >
    <template v-slot:title="{ title }"
      ><list-header :title="title" :has-tip="false"></list-header
    ></template>
    <template v-slot:default="{ detailInfo }">
      <v-list dense class="pt-8 pb-16">
        <v-row>
          <v-col :cols="detailInfo.hasFake ? 6 : 12" class="py-8">
            <v-list-item>
              <v-list-item-content v-if="detailInfo.hasFake" class="label"
                >真品图片：</v-list-item-content
              >
              <v-list-item-content>
                <v-img
                  :src="realUrl + detailInfo.photoSrc[0].src"
                  height="160"
                  contain
                ></v-img>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col v-if="detailInfo.hasFake" cols="6" class="py-8">
            <v-list-item>
              <v-list-item-content class="label"
                >赝品图片：</v-list-item-content
              >
              <v-list-item-content>
                <v-img
                  :src="realUrl + detailInfo.photoSrc[1].src"
                  height="160"
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
              <v-list-item-content class="label"
                >真实名字：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                detailInfo.realName
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
                >售出价格：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                detailInfo.salePrice
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label">尺寸：</v-list-item-content>
              <v-list-item-content class="align-end">{{
                detailInfo.size
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
          <v-col v-if="detailInfo.hasFake" cols="12" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >赝品鉴别方法：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                detailInfo.fakeCharacter
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-list>
    </template>
  </info-detail>
</template>

<script>
import { getArtwork } from '@/api/artwork'

export default {
  name: 'ArtworkDetail',
  data() {
    return {
      getDetailApi: getArtwork,
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
          text: '艺术品',
          href: '/archive/museum/artwork',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
