<template>
  <v-app-bar
    app
    color="secondary"
    dark
    shrink-on-scroll
    prominent
    src="@/assets/bar-bg.jpg"
    fade-img-on-scroll
  >
    <!-- <v-app-bar-nav src="https://picsum.photos/1920/1080?random"> -->
    <div class="d-flex align-center">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-img
        alt="Dongsen Logo"
        class="shrink mr-2"
        contain
        :src="require('@/assets/dongsen-logo.png')"
        transition="scale-transition"
        width="100"
      />
      <v-toolbar-title class="teal--text font-weight-bold hidden-sm-and-down"
        >动森之家</v-toolbar-title
      >
      <div class="d-flex align-center">
        <div v-for="(item, i) in menu" :key="'menu' + i" v-bind="item">
          <v-menu v-if="item.children" offset-y:open-on-hover="true">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                large
                class="text-button"
                v-bind="attrs"
                v-on="on"
              >
                {{ item.text }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(subNav, index) in item.children"
                :key="'subNav' + index"
                :to="subNav.href"
              >
                <v-list-item-title>
                  {{ subNav.text }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn v-else large text class="text-button" :to="item.href">
            {{ item.text }}
          </v-btn>
        </div>
        <v-spacer />

        <!-- <v-text-field append-icon="mdi-magnify" flat hide-details solo-inverted class="ml-2" style="max-width: 300px;" /> -->
      </div>
    </div>

    <v-spacer></v-spacer>
    <div v-if="token" class="d-flex py-0">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <v-avatar class="mr-2" style="flex: none" width="40" height="40">
              <img :src="realUrl + avatar" :alt="username" />
            </v-avatar>
            <span class="mr-2" style="flex: 1; line-height: 40px">{{
              username
            }}</span>
          </div>
        </template>
        <v-list>
          <v-list-item to="/user">
            <v-list-item-title>
              <v-icon class="mr-1">mdi-account-box-outline</v-icon>个人中心
            </v-list-item-title>
          </v-list-item>
          <v-list-item to="/user/password">
            <v-list-item-title>
              <v-icon class="mr-1">mdi-key</v-icon>修改密码
            </v-list-item-title>
          </v-list-item>
          <v-list-item href="http://106.54.168.208:1106/" target="_blank">
            <v-list-item-title>
              <v-icon class="mr-1">mdi-format-list-bulleted-square</v-icon
              >我发布的信息
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="logout">
              <v-icon class="mr-1">mdi-logout-variant</v-icon>退出登录
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-btn v-else text class="mr-2" to="/login">
      <span class="mr-2">登录</span>
      <v-icon>mdi-login-variant</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
// Utilities
import { mapGetters } from 'vuex'

export default {
  name: 'AppBar',
  computed: {
    // 获取app模块的menu的三种方式
    // ...mapState(['app']), //使用是app.menu
    // ...mapState('app', { menu: state => state.menu }),
    ...mapGetters(['menu', 'token', 'username', 'avatar']), //这种最便利
  },
  methods: {
    async logout() {
      if (
        await $Vue.$confirm('提示', '确定退出登录吗', {
          color: 'warning',
        })
      ) {
        $Vue.$dialogLoader.start(
          '登出中...',
          {},
          async () => {
            await this.$store.dispatch('user/logout')
            $Vue.$dialogLoader.showSnackbar('登出成功!', {
              color: 'success',
            })
            this.$router.go(0)
          },
          true
        )
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.v-text-field.v-text-field--solo .v-input__control {
  min-height: 44px;
}
</style>
