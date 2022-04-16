<template>
  <v-container class="bgWht" elevation-4>
    <bread-crumbs :bread-nav="breadNav"></bread-crumbs>
    <list-header title="注册新用户" :tips="tips" :has-tip="false">
    </list-header>
    <v-form
      ref="addForm"
      v-model="valid"
      lazy-validation
      class="pa-16 addForm mx-auto"
    >
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="userInfo.email"
            type="email"
            :rules="formRules.email"
            label="邮箱"
            placeholder="请输入"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="userInfo.username"
            :rules="formRules.require"
            label="用户名"
            placeholder="请输入"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="userInfo.password"
            type="password"
            :rules="formRules.require"
            label="密码"
            placeholder="请输入"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="form-btns d-flex justify-lg-space-between mt-4 mx-auto">
        <v-btn
          :disabled="!valid"
          color="primary"
          class="mr-4"
          large
          @click="submit"
        >
          提交
        </v-btn>
        <v-btn color="secondary" large @click="() => commonApi.resetForm(this)">
          重置
        </v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import { addUser } from '@/api/user'
export default {
  name: 'Register',
  data() {
    return {
      valid: false,
      userInfo: {
        email: '',
        username: '',
        password: '',
        state: 0,
      },
      formRules: {
        require: [v => !!v || '不能为空！'],
        email: [
          v => !!v || '邮箱不能为空！',
          v =>
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            '邮箱不符合规则！',
        ],
      },
      breadNav: [
        {
          text: '首页',
          disabled: false,
          href: '/',
        },
        {
          text: '用户中心',
          disabled: false,
          href: '/user',
        },
        {
          text: '注册用户',
          disabled: true,
          href: '/user/register',
        },
      ],
      tips: '',
    }
  },
  created() {},
  methods: {
    submit() {
      if (this.$refs.addForm.validate()) {
        addUser(this.userInfo)
          .then(async res => {
            // $Vue.$dialogLoader.showSnackbar(res.message, { color: 'success' })
            this.commonApi.resetForm(this)
            // 是否继续将其他信息补充完整？
            if (
              await $Vue.$confirm(
                '提示',
                '账号注册成功！是否需要马上登录并将个人信息补充完整？',
                {
                  color: 'warning',
                }
              )
            ) {
              this.$router.push('/login?redirect=/user/edit')
            } else {
              this.$router.push('/login?redirect=/')
            }
          })
          .catch(error => {
            $Vue.$dialogLoader.showSnackbar(error.message, {
              color: 'error',
            })
          })
      } else {
        this.valid = false
        $Vue.$dialogLoader.showSnackbar('信息有误，请重新填写！', {
          color: 'error',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.addForm {
  width: 600px;
}
.form-btns .v-btn {
  width: 150px;
}
</style>
