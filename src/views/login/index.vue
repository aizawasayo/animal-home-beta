<template>
  <v-container class="bgWht" elevation-4>
    <bread-crumbs :bread-nav="breadNav"></bread-crumbs>
    <list-header title="请登录" :has-tip="false"></list-header>
    <v-form ref="loginForm" v-model="valid" lazy-validation class="login-form">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="loginForm.username"
            :counter="20"
            :rules="loginRules.username"
            label="用户名"
            placeholder="请输入用户名"
            prepend-inner-icon="mdi-account-circle"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="loginForm.password"
            :rules="loginRules.psw"
            label="密码"
            placeholder="请输入密码"
            :type="pswShow ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock"
            :append-icon="pswShow ? 'mdi-eye' : 'mdi-eye-off'"
            required
            @click:append="pswShow = !pswShow"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="d-flex justify-lg-space-between mt-4">
        <v-btn
          :disabled="!valid"
          color="primary"
          class="mr-4"
          large
          @click="login"
        >
          登录
        </v-btn>
        <v-btn
          color="secondary"
          class="mr-4"
          large
          @click="() => commonApi.resetForm(this)"
        >
          重置
        </v-btn>
        <v-btn color="success" large @click="register"> 注册 </v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: { username: 'aizawasayo', password: 'iwnini122900' },
      valid: false,
      loginRules: {
        username: [v => !!v || '用户名必填！'],
        psw: [
          v => !!v || '密码必填！',
          v => v.length >= 6 || '密码不能少于6位',
        ],
      },
      pswShow: false,
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: '登录',
          disabled: true,
          href: '/login/',
        },
      ],
      redirect: undefined,
      snackbar: false,
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true,
    },
  },
  // beforeRouteEnter(to, from, next) {
  //   // does NOT have access to `this` component instance}
  // },
  // beforeRouteLeave(to, from, next) {
  //   // 设置下一个路由的meta（即首页）
  //   // to.meta.keepAlive = false //让首页不缓存，即刷新
  //   // next()
  // },
  methods: {
    login() {
      if (this.$refs.loginForm.validate()) {
        this.valid = true
        // console.log(this.$route)
        // return
        this.$store
          .dispatch('user/login', this.loginForm)
          .then(() => {
            $Vue.$dialogLoader.showSnackbar('登录成功！', { color: 'success' })
            if (this.redirect) {
              // 需登录页面传前路由带过来的路径
              this.$router.push({ path: this.redirect })
            } else {
              // 不需登录的页面直接后退一步
              this.$router.go(-1)
            }
            // this.$router.push({ path: this.redirect || '/user' })
          })
          .catch(() => {
            $Vue.$dialogLoader.showSnackbar(
              '登录失败，请输入正确的用户名和密码！',
              { color: 'error' }
            )
          })
      } else {
        this.valid = false
        $Vue.$dialogLoader.showSnackbar('请输入正确的用户名和密码！', {
          color: 'error',
        })
      }
    },
    register() {
      this.$router.push('/user/register')
    },
  },
}
</script>

<style lang="scss" scoped>
.login-form {
  padding: 100px 300px;
}
.v-btn {
  width: 150px;
}
</style>
