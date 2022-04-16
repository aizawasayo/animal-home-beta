<template>
  <v-container class="bgWht" elevation-4>
    <bread-crumbs :bread-nav="breadNav"></bread-crumbs>
    <list-header title="用户中心" :tips="tips" :has-tip="false">
      <template v-slot:btn>
        <v-btn class="primary mt-1" to="/user/edit">修改个人信息</v-btn>
      </template>
    </list-header>
    <v-card class="detail">
      <v-list dense class="py-16">
        <v-row>
          <v-col cols="4" class="py-8">
            <v-list-item>
              <v-list-item-content>
                <v-img
                  :src="realUrl + info.avatar"
                  height="240"
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
                    >用户名：{{ info.username }}<span></span
                  ></v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6" class="py-2">
                <v-list-item>
                  <v-list-item-content class="label"
                    >昵称：</v-list-item-content
                  >
                  <v-list-item-content class="align-end">{{
                    info.nickname
                  }}</v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6" class="py-2">
                <v-list-item>
                  <v-list-item-content class="label"
                    >动森ID：</v-list-item-content
                  >
                  <v-list-item-content class="align-end">{{
                    info.gameId
                  }}</v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6" class="py-2">
                <v-list-item>
                  <v-list-item-content class="label"
                    >岛屿位置：</v-list-item-content
                  >
                  <v-list-item-content class="align-end">{{
                    info.position === 'North' ? '北半球' : '南半球'
                  }}</v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6" class="py-2">
                <v-list-item>
                  <v-list-item-content class="label"
                    >登岛日期：</v-list-item-content
                  >
                  <v-list-item-content class="align-end">{{
                    info.startDate | parseTime('{y}-{m}-{d}')
                  }}</v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6" class="py-2">
                <v-list-item>
                  <v-list-item-content class="label"
                    >岛屿名称：</v-list-item-content
                  >
                  <v-list-item-content class="align-end">{{
                    info.islandName
                  }}</v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6" class="py-2">
                <v-list-item>
                  <v-list-item-content class="label"
                    >个性签名：</v-list-item-content
                  >
                  <v-list-item-content class="align-end">{{
                    info.signature ? info.signature : '暂无'
                  }}</v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col v-if="info.ideal" cols="6" class="py-2">
                <v-list-item>
                  <v-list-item-content class="label"
                    >状态：</v-list-item-content
                  >
                  <v-list-item-content class="align-end">{{
                    info.state === 0 ? '启用' : '禁用'
                  }}</v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUser } from '@/api/user'

export default {
  name: 'UserCenter',
  data() {
    return {
      info: {},
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: '用户中心',
          disabled: true,
          href: '/user',
        },
      ],
      tips: '用户中心',
    }
  },
  computed: {
    ...mapGetters(['userId']),
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      getUser(this.userId).then(response => {
        this.info = response.data
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.v-list-item--dense .v-list-item__content,
.v-list--dense .v-list-item .v-list-item__content {
  padding: 16px 0;
  font-size: 16px;
}
.cute-title {
  // background: url('../../assets/title-bg.jpg') repeat;
}
</style>
