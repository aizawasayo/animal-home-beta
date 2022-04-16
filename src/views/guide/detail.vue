<template>
  <info-detail
    :breadNav="breadNav"
    :getDetailApi="getDetailApi"
    type="guide"
    hasInteract
    breadText="攻略详情"
  >
    <template v-slot:title="{ title }"
      ><list-header :title="title" :has-tip="false"></list-header
    ></template>
    <template v-slot:default="{ detailInfo }">
      <v-list dense class="py-16 px-16">
        <v-row>
          <v-col
            v-for="(photo, i) in detailInfo.photoSrc"
            :key="photo + i"
            cols="12"
            class="py-8"
          >
            <v-list-item>
              <v-list-item-content>
                <v-img :src="realUrl + photo.src" height="450" contain></v-img>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label">分类：</v-list-item-content>
              <v-list-item-content class="align-end">{{
                detailInfo.type
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >来源平台：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                detailInfo.platforms ? detailInfo.platforms.join('/') : ''
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >发布时间：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                detailInfo.created_time | parseTime('{y}-{m}-{d} {h}:{i}')
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" class="py-2">
            <v-list-item>
              <v-list-item-content class="label">作者：</v-list-item-content>
              <v-list-item-content class="align-end d-flex py-0">
                <v-avatar
                  class="mr-2"
                  style="flex: none"
                  width="40"
                  height="40"
                >
                  <img
                    v-if="detailInfo.author"
                    :src="realUrl + detailInfo.author.avatar"
                  />
                </v-avatar>
                <span
                  v-if="detailInfo.author"
                  style="flex: 1; line-height: 40px"
                  >{{ detailInfo.author.nickname }}</span
                >
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col v-if="detailInfo.source_uri" cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >原文地址：</v-list-item-content
              >
              <v-list-item-content class="align-end">
                <a :href="detailInfo.source_uri" target="_blank">{{
                  detailInfo.source_uri
                }}</a>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-list>
      <div class="mx-auto px-10 mb-16" v-html="detailInfo.content"></div>
    </template>
  </info-detail>
</template>

<script>
import { getGuide } from '@/api/guide'

export default {
  name: 'GuideDetail',
  data() {
    return {
      getDetailApi: getGuide,
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: '攻略',
          href: '/guide/',
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
    &.label {
      width: 70px;
    }
  }
}
</style>
