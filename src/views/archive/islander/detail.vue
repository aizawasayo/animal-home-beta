<template>
  <info-detail
    :breadNav="breadNav"
    :getDetailApi="getDetailApi"
    type="islander"
  >
    <template v-slot:title="{ title }"
      ><list-header :title="title" :has-tip="false"></list-header
    ></template>
    <template v-slot:default="{ detailInfo }">
      <v-list dense class="py-16">
        <v-row>
          <v-col cols="4" class="py-8">
            <v-list-item>
              <v-list-item-content>
                <v-img
                  :src="realUrl + detailInfo.photoSrc"
                  height="300"
                  contain
                ></v-img>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="8">
            <v-row>
              <v-col cols="12" class="py-2">
                <v-list-item>
                  <v-list-item-content
                    class="cute-title white--text rounded text-h5 px-8"
                    >{{
                      detailInfo.name +
                      '     （amiibo序号：' +
                      (detailInfo.amiibo ? detailInfo.amiibo : '暂无') +
                      ')'
                    }}<span></span
                  ></v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6" class="py-2">
                <v-list-item>
                  <v-list-item-content class="label"
                    >英文名：</v-list-item-content
                  >
                  <v-list-item-content class="align-end">{{
                    detailInfo.engName ? detailInfo.engName : '暂无'
                  }}</v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6" class="py-2">
                <v-list-item>
                  <v-list-item-content class="label"
                    >日文名：</v-list-item-content
                  >
                  <v-list-item-content class="align-end">{{
                    detailInfo.jpnName ? detailInfo.jpnName : '暂无'
                  }}</v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6" class="py-2">
                <v-list-item>
                  <v-list-item-content class="label"
                    >生日：</v-list-item-content
                  >
                  <v-list-item-content class="align-end">{{
                    detailInfo.birth
                  }}</v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6" class="py-2">
                <v-list-item>
                  <v-list-item-content class="label"
                    >性别：</v-list-item-content
                  >
                  <v-list-item-content class="align-end">{{
                    detailInfo.sex === 1 ? '♂' : '♀'
                  }}</v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6" class="py-2">
                <v-list-item>
                  <v-list-item-content class="label"
                    >种族：</v-list-item-content
                  >
                  <v-list-item-content class="align-end">{{
                    detailInfo.breed
                  }}</v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6" class="py-2">
                <v-list-item>
                  <v-list-item-content class="label"
                    >性格：</v-list-item-content
                  >
                  <v-list-item-content class="align-end">{{
                    detailInfo.character +
                    (detailInfo.subtype ? detailInfo.subtype : '暂无')
                  }}</v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6" class="py-2">
                <v-list-item>
                  <v-list-item-content class="label"
                    >爱好：</v-list-item-content
                  >
                  <v-list-item-content class="align-end">{{
                    detailInfo.hobby ? detailInfo.hobby : '暂无'
                  }}</v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6" class="py-2">
                <v-list-item>
                  <v-list-item-content class="label"
                    >音高：</v-list-item-content
                  >
                  <v-list-item-content class="align-end">{{
                    detailInfo.voice ? detailInfo.voice : '暂无'
                  }}</v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6" class="py-2">
                <v-list-item>
                  <v-list-item-content class="label"
                    >初始口头禅：</v-list-item-content
                  >
                  <v-list-item-content class="align-end">{{
                    detailInfo.petPhrase ? detailInfo.petPhrase : '暂无'
                  }}</v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col v-if="detailInfo.motto" cols="6" class="py-2">
                <v-list-item>
                  <v-list-item-content class="label"
                    >座右铭：</v-list-item-content
                  >
                  <v-list-item-content class="align-end">{{
                    detailInfo.motto ? detailInfo.motto : '暂无'
                  }}</v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col v-if="detailInfo.ideal" cols="6" class="py-2">
                <v-list-item>
                  <v-list-item-content class="label"
                    >目标：</v-list-item-content
                  >
                  <v-list-item-content class="align-end">{{
                    detailInfo.ideal ? detailInfo.ideal : '暂无'
                  }}</v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-list>
    </template>
  </info-detail>
</template>

<script>
import { getIslander } from '@/api/islander'

export default {
  name: 'IslanderDetail',
  data() {
    return {
      getDetailApi: getIslander,
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: '岛民',
          href: '/archive/islander',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.cute-title {
  // background: url('../../assets/title-bg.jpg') repeat;
}
</style>
