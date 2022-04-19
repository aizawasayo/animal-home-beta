<template>
  <info-detail :breadNav="breadNav" :getDetailApi="getDetailApi" type="design">
    <template v-slot:title="{ title }"
      ><list-header :title="title" :has-tip="false"></list-header
    ></template>
    <template v-slot:default="{ detailInfo }">
      <v-list dense class="py-16">
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
              <v-list-item-content class="label"
                >设计名称：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                detailInfo.name
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >上传时间：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                detailInfo.created_time | parseTime('{y}-{m}-{d} {h}:{i}')
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label">作者：</v-list-item-content>
              <v-list-item-content
                v-if="detailInfo.user"
                class="align-end d-flex py-0"
              >
                <v-avatar
                  class="mr-2"
                  style="flex: none"
                  width="40"
                  height="40"
                >
                  <img
                    :src="realUrl + detailInfo.user.avatar"
                    :alt="detailInfo.user.username"
                  />
                </v-avatar>
                <span style="flex: 1; line-height: 40px">{{
                  detailInfo.user.username
                }}</span>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >详细说明：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                detailInfo.content
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-list>
    </template>
  </info-detail>
</template>

<script>
import { getDesign } from '@/api/design'

export default {
  name: 'DesignDetail',
  data() {
    return {
      getDetailApi: getDesign,
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: '设计分享',
          href: '/design/',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
