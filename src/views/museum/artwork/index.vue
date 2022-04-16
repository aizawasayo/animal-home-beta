<template>
  <info-card-list
    type="artwork"
    typeName="艺术品"
    :config-obj="configObj"
    :getListApi="getListApi"
    :listFilters.sync="filters"
    :sortKey.sync="sortBy"
    :sortVal.sync="sortDesc"
    disableResetBtn
    search-width="400px"
  >
    <template v-slot:default="{ item }">
      <v-card-title class="subheading font-weight-bold white--text">{{
        item.name
      }}</v-card-title>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-img
              :src="realUrl + item.photoSrc[0].src"
              height="100"
              contain
            ></v-img>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-col cols="5" class="py-0">
              <v-list-item-content
                :class="{
                  'cyan--text text--lighten-2': sortBy === 'price',
                }"
                >价格：</v-list-item-content
              >
            </v-col>
            <v-col cols="7" class="py-0">
              <v-list-item-content class="align-end">{{
                item.price
              }}</v-list-item-content>
            </v-col>
          </v-row>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-col cols="5" class="py-0">
              <v-list-item-content
                :class="{
                  'cyan--text text--lighten-2': sortBy === 'salePrice',
                }"
                >售出价格：</v-list-item-content
              >
            </v-col>
            <v-col cols="7" class="py-0">
              <v-list-item-content class="align-end"
                >{{ item.salePrice }}(赝品为0)</v-list-item-content
              >
            </v-col>
          </v-row>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-col cols="5" class="py-0">
              <v-list-item-content>真名：</v-list-item-content>
            </v-col>
            <v-col cols="7" class="py-0">
              <v-list-item-content class="align-end">
                {{ item.realName | textFilter(8) }}</v-list-item-content
              >
            </v-col>
          </v-row>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-col cols="5" class="py-0">
              <v-list-item-content
                :class="{
                  'cyan--text text--lighten-2': sortBy === 'size',
                }"
                >尺寸：</v-list-item-content
              >
            </v-col>
            <v-col cols="7" class="py-0">
              <v-list-item-content class="align-end">{{
                item.size
              }}</v-list-item-content>
            </v-col>
          </v-row>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-col cols="5" class="py-0">
              <v-list-item-content>有无赝品：</v-list-item-content>
            </v-col>
            <v-col cols="7" class="py-0">
              <v-list-item-content class="align-end">{{
                item.hasFake === true ? '有' : '无'
              }}</v-list-item-content>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </template>
  </info-card-list>
</template>

<script>
import { getArtworkList } from '@/api/artwork'

export default {
  name: 'Artwork',
  data() {
    return {
      getListApi: getArtworkList,
      filters: {
        hasFake: '',
      },
      sortBy: 'name',
      sortDesc: false,
      configObj: {
        sortKeys: [
          { text: '名字', value: 'name' },
          { text: '尺寸', value: 'size' },
        ],
        filtersArr: [{ key: 'hasFake', text: '是否有赝品' }],
        selectLists: {
          hasFakeList: [
            { text: '有赝品', value: 'true' },
            { text: '无赝品', value: 'false' },
          ],
        },
      },
    }
  },
}
</script>

<style lang="scss" scoped></style>
