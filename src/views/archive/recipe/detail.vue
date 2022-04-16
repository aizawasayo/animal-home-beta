<template>
  <info-detail
    :breadNav="breadNav"
    :getDetailApi="getDetailApi"
    :dataProcess="dataProcess"
    type="recipe"
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
                  :src="realUrl + detailInfo.photoSrc"
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
              <v-list-item-content class="label"
                >占地尺寸：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                detailInfo.size
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col v-if="detailInfo.unlockCondition" cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >解锁条件：</v-list-item-content
              >
              <v-list-item-content class="align-end">{{
                '总DIY数量满' + detailInfo.unlockCondition + '次'
              }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" class="py-2">
            <v-list-item>
              <v-list-item-content class="label"
                >合成材料：</v-list-item-content
              >
              <v-list-item-content class="align-end d-flex py-0">
                <span
                  v-for="(m, i) in detailInfo.materials"
                  class="d-flex"
                  style="flex: 1 0 auto"
                >
                  <v-img
                    :src="realUrl + m.photoSrc"
                    height="40"
                    contain
                    style="flex: none; width: 50px"
                  ></v-img>
                  <span style="flex: 1; line-height: 40px">{{
                    m.name + '×' + m.num
                  }}</span>
                </span>
              </v-list-item-content>
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
        </v-row>
      </v-list>
    </template>
  </info-detail>
</template>

<script>
import { getRecipe } from '@/api/recipe'

export default {
  name: 'RecipeDetail',
  data() {
    return {
      getDetailApi: getRecipe,
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: 'DIY配方图鉴',
          href: '/archive/recipe',
        },
      ],
    }
  },
  methods: {
    dataProcess(data) {
      let channels = ''
      const season = data.season ? data.season + '/' : ''
      const activity = data.activity ? data.activity + '/' : ''
      const character = data.character ? `(${data.character}性格)` : ''
      const channelData = data.channels
      const npc = data.npc ? `(${data.npc})` : ''
      channelData.forEach((c, i) => {
        if (c === '岛民' || c === 'NPC') {
          c = c + '赠送'
        }
        if (i === channelData.length - 1) {
          channels += c
        } else {
          channels += c + '/'
        }
      })
      data.channelInfo = season + activity + character + channels + npc
    },
  },
}
</script>

<style lang="scss" scoped></style>
