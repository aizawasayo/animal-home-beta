<template>
  <v-footer class="py-4" dark height="auto">
    <v-container class="mx-auto copyright">
      <v-row>
        <v-col cols="9">
          <p>
            抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益脑
            沉迷游戏伤身 合理安排时间 享受健康生活
          </p>
          <p>
            啊姿猫信息技术有限公司 | COPYRIGHT ©2019-2020 AIZAWASAYO ALL RIGHTS
            RESERVED.
          </p>
          <p>
            浙网文[2020]0715-033号 | 浙ICP备15002322号-2 |
            浙ICP证：浙B2-20180003
          </p>
          <p>
            <a
              target="_blank"
              class="record"
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011002002336"
              ><img
                style="vertical-align: top; width: 20px; height: 20px"
                src="//static.biligame.net/common/images/record-logo.png"
              />
              沪公网安备 31011003003336 号</a
            >
          </p>
        </v-col>

        <v-spacer />

        <v-btn class="mr-0" square title="Go to top" @click="$vuetify.goTo(0)">
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data: () => ({
    items: [
      {
        href: '#!',
        icon: 'mdi-twitter',
      },
      {
        href: '#!',
        icon: 'mdi-instagram',
      },
      {
        href: '#!',
        icon: 'mdi-facebook',
      },
      {
        href: '#!',
        icon: 'mdi-google-plus',
      },
      {
        href: '#!',
        icon: 'mdi-reddit',
      },
      {
        href: '#!',
        icon: 'mdi-discord',
      },
      {
        href: '#!',
        icon: 'mdi-pinterest',
      },
    ],
  }),
}
</script>

<style lang="scss" scoped>
.theme--dark.v-footer {
  background-color: #e0f7fa;
  color: #272727;
}
.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #81c784;
}
.v-sheet.v-footer:not(.v-sheet--outlined) {
  box-shadow: 0px 1px 3px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
}
.copyright p {
  margin-bottom: 4px;
  font-size: 12px;
  color: #7d7d7d;
}
.copyright p a {
  font: inherit;
  text-decoration: none;
}
</style>
