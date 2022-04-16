<template>
  <v-card>
    <v-card-title class="white--text">
      <v-icon left> mdi-image-multiple </v-icon>
      <span class="title font-weight-bold">图鉴分类</span>
    </v-card-title>
    <div class="d-flex pa-4 flex-wrap">
      <div
        justify="center"
        align="center"
        v-for="(link, index) in archive"
        :key="link + index"
        style="width: 20%"
      >
        <router-link :to="link.href">
          <v-img
            :src="require(`@/assets/icon-${link.src}.png`)"
            width="100"
            class="rounded-circle elevation-1"
          ></v-img>
          <p justify="center" class="cyan--text text--lighten-2 mb-0 py-2">
            {{ link.name }}
          </p>
        </router-link>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      archive: [
        { name: '小动物', src: 'islander', href: '/archive/islander' },
        { name: '博物馆', src: 'museum', href: '/archive/museum' },
        { name: '家具', src: 'furniture', href: '/archive/furniture' },
        { name: '服饰', src: 'clothing', href: '/archive/clothing' },
        { name: '植物', src: 'plant', href: '/archive/plant' },
        { name: '素材', src: 'material', href: '/archive/material' },
        { name: '工具', src: 'tool', href: '/archive/tool' },
        { name: 'DIY配方', src: 'diy', href: '/archive/recipe' },
        { name: '唱片', src: 'record', href: '/archive/record' },
      ],
    }
  },
  computed: {},
  methods: {
    goArchive(href) {
      this.$router.push(href)
      //this.$message.success(href)
    },
  },
}
</script>

<style lang="scss" scoped></style>
