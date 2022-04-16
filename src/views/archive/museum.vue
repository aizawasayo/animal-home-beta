<template>
  <v-container class="bgWht picList" elevation-4>
    <bread-crumbs :bread-nav="breadNav"></bread-crumbs>
    <list-header title="博物馆" :tips="tips" hasTip></list-header>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      class="elevation-0 table-tab picList"
      centered
      optional
      @change="activeTab()"
    >
      <v-tab
        v-for="(item, i) in tabOptions"
        :key="item.value + i"
        :to="`${item.value}`"
      >
        <v-icon>{{ 'mdi-' + item.icon }}</v-icon>
        {{ item.text }}
      </v-tab>
    </v-tabs>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  name: 'Museum',
  data() {
    return {
      tab: '/archive/museum/fish',
      tabName: '鱼类',
      tabOptions: [
        { text: '鱼类', value: '/archive/museum/fish', icon: 'fish' },
        { text: '昆虫', value: '/archive/museum/insect', icon: 'bee' },
        {
          text: '化石',
          value: '/archive/museum/fossil',
          icon: 'google-downasaur',
        },
        { text: '艺术品', value: '/archive/museum/artwork', icon: 'brush' },
        {
          text: '海洋生物',
          value: '/archive/museum/halobios',
          icon: 'jellyfish',
        },
      ],
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: '博物馆图鉴',
          disabled: true,
          href: '/archive/museum',
        },
      ],
      tips: '博物馆可接纳的藏品图鉴目前有五个类别，请点击下面选项卡进行切换。下方工具栏的箭头按钮是根据左侧选择的属性对信息进行排序。向上箭头是顺序（从小到大），向下箭头是倒序（从大到小）。',
    }
  },
  computed: {},
  watch: {},
  methods: {
    activeTab() {
      const tabHref = this.$route.fullPath
      const cTab = this.tabOptions.filter(item => item.value === tabHref)
      this.tabName = cTab[0].text
      if (this.breadNav.length === 3) {
        this.breadNav.pop()
        this.addBreadNav()
      } else {
        this.addBreadNav()
      }
    },
    addBreadNav() {
      this.breadNav.push({
        text: this.tabName,
        disabled: true,
        href: this.$route.fullPath,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
