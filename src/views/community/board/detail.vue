<template>
  <info-detail
    :breadNav="breadNav"
    :getDetailApi="getDetailApi"
    type="board"
    hasInteract
    comment-default="可以留下你的想法和意见～"
    breadText="森友墙详情"
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
              {{ detailInfo.created_time | formatTime }}发布
            </div>
          </v-col>
          <v-col cols="12" class="py-2">
            <div class="mx-auto px-10">
              <v-chip
                :color="detailInfo.color ? detailInfo.color : 'secondary'"
                outlined
                class="mr-2"
              >
                <v-avatar left>
                  <v-icon v-if="detailInfo.icon">
                    {{ 'mdi-' + detailInfo.icon }}</v-icon
                  >
                  <v-icon v-else>mdi-sprout</v-icon>
                </v-avatar>
                {{ detailInfo.topic }}
              </v-chip>
              {{ detailInfo.content }}
            </div>
          </v-col>
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
        </v-row>
      </v-list>
    </template>
    <!-- <template v-slot:footer="{content}">
      <operation type="board" :title="content" />
    <comment
      ref="comment"
      type="board"
      default-text="可以留下你的想法和意见～"
    />
    </template> -->
  </info-detail>
</template>

<script>
import { getBoard } from '@/api/board'

export default {
  name: 'BoardDetail',
  data() {
    return {
      getDetailApi: getBoard,
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: '森友墙',
          href: '/community/board/',
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
