<template>
  <info-detail
    :breadNav="breadNav"
    :getDetailApi="getDetailApi"
    type="plant"
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
                <v-img :src="realUrl + detailInfo.photoSrc" height="128" contain></v-img>
              </v-list-item-content>
            </v-list-item>
          </v-col>
           <v-col cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label">种类：</v-list-item-content>
              <v-list-item-content class="align-end">{{ detailInfo.type && detailInfo.type.join('、')}}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label">价格：</v-list-item-content>
              <v-list-item-content class="align-end">{{ detailInfo.price }}</v-list-item-content>
            </v-list-item>
          </v-col>
         
           <v-col v-if="hasGrowStage(detailInfo)"  cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label">来源：</v-list-item-content>
              <v-list-item-content class="align-end">{{ detailInfo.channel }}</v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col v-if="isSeed(detailInfo)" cols="4" class="py-2">
            <v-list-item>
              <v-list-item-content class="label">种子名称：</v-list-item-content>
              <v-list-item-content class="align-end d-flex py-0">
                <v-img :src="realUrl + detailInfo.seed.photoSrc" height="40" contain style="flex: none; width:50px"></v-img>
                <span style="flex:1; line-height:40px;">{{ detailInfo.seed.name }}</span>
                </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col v-if="isMix(detailInfo)" cols="6" class="py-2">
            <v-list-item>
              <v-list-item-content class="label">杂交来源品种：</v-list-item-content>
              <v-list-item-content class="align-end d-flex py-0"> 
                <span v-for="(mix,i) in detailInfo.mixPlant" class="d-flex" style="flex: 1 0 50%;">
                  <v-img :src="realUrl + mix.photoSrc" height="40" contain style="flex: none; width:50px"></v-img>
                  <span style="flex:1; line-height:40px;">{{mix.name}}</span>
                </span> 
              </v-list-item-content>
            </v-list-item>
          </v-col>

          <v-col v-if="hasGrowStage(detailInfo)" cols="6" class="pt-2 pb-8">
            <v-list-item>
              <v-list-item-content class="label">成长阶段：</v-list-item-content>
              <v-list-item-content class="align-end">{{ detailInfo.growStage && detailInfo.growStage[0] ? detailInfo.growStage.join('-') : '' }}</span>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-list>
  </template>
  </info-detail>
</template>

<script>
import { getPlant } from '@/api/plant'

export default {
  name: 'PlantDetail',
  data() {
    return {
      getDetailApi: getPlant,
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/'
        },
        {
          text: '植物图鉴',
          href: '/archive/plant'
        }
      ]
    }
  },
  methods: {
    isSeed(data){
      return data.channel && data.channel === '种子'
    },
    isMix(data){
      return data.channel && (data.channel === '花卉杂交')
    },
    hasGrowStage(data) {
      return !((data.type && data.type.includes('种子')) || (data.type && data.type.includes('树苗')))
    }
  }
}
</script>

<style lang="scss" scoped></style>
