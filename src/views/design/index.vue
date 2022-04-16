<template>
  <v-container class="bgWht picList" elevation-4>
    <bread-crumbs :bread-nav="breadNav"></bread-crumbs>
    <list-header title="设计分享" :tips="tips" hasTip>
      <template v-slot:btn>
        <v-btn class="primary mt-1" to="/design/add">发布我的设计</v-btn>
      </template>
    </list-header>
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
        :href="`#${item.value}`"
        @click="tabClick($event)"
        replace
      >
        <v-icon>{{ 'mdi-' + item.icon }}</v-icon>
        {{ item.text }}
      </v-tab>
      <v-tab-item
        v-for="(item, i) in tabOptions"
        :key="item.value + 'list' + i"
        :value="item.value"
      >
        <design-list :type="item.value"></design-list>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
export default {
  name: 'Design',
  components: {
    DesignList: () => import('./components/list'),
  },
  data() {
    return {
      tab: 'clothingDesign',
      tabName: '衣服',
      tabOptions: [
        { text: '衣服', value: 'clothingDesign', icon: 'hanger' },
        { text: '帽子', value: 'hatDesign', icon: 'redhat' },
        { text: '图案', value: 'patternDesign', icon: 'lock-pattern' },
      ],
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: '设计分享',
          disabled: true,
          href: '/design',
        },
        {
          text: '衣服',
          disabled: false,
        },
      ],
      tips: '本页面用于动森玩家分享DIY设计(服装/帽子/图案均可)，点击【添加自己的DIY分享】按钮进行图片上传及信息填写，图片格式接受jpg或png。\n 此操作需要先登录。',
    }
  },
  computed: {},
  watch: {},
  methods: {
    activeTab() {
      const cTab = this.tabOptions.filter(item => item.value === this.tab)
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
    tabClick(e) {
      console.log(e)
    },
  },
}
</script>

<style lang="scss" scoped></style>
