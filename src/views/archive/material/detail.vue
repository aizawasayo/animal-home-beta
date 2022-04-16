<template>
  <info-detail
    :breadNav="breadNav"
    :getDetailApi="getDetailApi"
    :dataProcess="dataProcess"
    type="material"
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
          <v-col v-if="detailInfo.engName" cols="4" class="py-2">
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
              <v-list-item-content class="label">价格：</v-list-item-content>
              <v-list-item-content class="align-end">{{
                detailInfo.price ? detailInfo.price : '暂无'
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col v-if="detailInfo.maxNum" cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >最大堆叠数量：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                detailInfo.maxNum
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="6" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >来源渠道：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                detailInfo.source
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-list>
    </template>
  </info-detail>
</template>

<script>
import { getMaterial } from '@/api/material'

export default {
  name: 'MaterialDetail',
  data() {
    return {
      getDetailApi: getMaterial,
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: '素材',
          href: '/archive/material',
        },
      ],
    }
  },
  methods: {
    dataProcess(data) {
      const activity = data.activity ? data.activity + '/' : ''
      data.source = data.season.join('/') + activity + data.channels.join('/')
    },
  },
}
</script>

<style lang="scss" scoped></style>
