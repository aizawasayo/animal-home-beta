<template>
  <v-card>
    <v-carousel :show-arrows="false" cycle interval="5000" height="260">
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :href="item.link"
        :src="realUrl + item.avatar"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script>
import { getBannerList } from '@/api/banner'

export default {
  data() {
    return {
      queryInfo: {
        sort: '',
        state: 0,
      },
      items: [],
    }
  },
  computed: {},
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getBannerList(this.queryInfo).then(response => {
        this.items = response.data
      })
    },
  },
}
</script>

<style lang="scss" scoped>
/* .v-image__image--cover {
  width: 100%;
  height: 100%;
} */
</style>
