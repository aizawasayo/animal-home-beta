<template>
  <info-detail
    :breadNav="breadNav"
    :getDetailApi="getDetailApi"
    :dataProcess="dataProcess"
    type="fossil"
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
import { getFossil } from '@/api/fossil'

export default {
  name: 'FossilDetail',
  data() {
    return {
      getDetailApi: getFossil,
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
          text: '化石',
          href: '/archive/museum/fossil',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
