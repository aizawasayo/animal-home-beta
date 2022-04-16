<template>
  <v-container class="bgWht" elevation-4>
    <bread-crumbs :bread-nav="breadNav"></bread-crumbs>
    <list-header title="修改密码" :tips="tips" :has-tip="false"> </list-header>
    <v-form
      ref="addForm"
      v-model="valid"
      lazy-validation
      class="pa-16 addForm mx-auto"
    >
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="userInfo.password"
            type="password"
            :rules="formRules.require"
            label="原密码"
            placeholder="请输入"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="userInfo.oldPsw"
            type="password"
            :rules="formRules.require"
            label="确认原密码"
            placeholder="请输入"
            required
            :error-messages="emailMatchError()"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="userInfo.newPsw"
            type="password"
            :rules="formRules.require"
            label="新密码"
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
import { mapGetters } from 'vuex'
import { modifyPsw } from '@/api/user'
export default {
  name: 'PswEdit',
  data() {
    return {
      valid: false,
      userInfo: {
        password: '',
        oldPsw: '',
        newPsw: '',
      },
      formRules: {
        require: [v => !!v || '不能为空！'],
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
          text: '修改密码',
          disabled: true,
          href: '/user/password',
        },
      ],
      tips: '',
    }
  },
  computed: {
    ...mapGetters(['userId']),
  },
  created() {},
  methods: {
    submit() {
      if (this.$refs.addForm.validate()) {
        modifyPsw(this.userId, this.userInfo).then(res => {
          $Vue.$dialogLoader.showSnackbar(res.message, {
            color: 'success',
          })
          this.commonApi.resetForm(this)
          this.$router.push('/user')
        })
      } else {
        this.valid = false
        $Vue.$dialogLoader.showSnackbar('信息有误，请重新填写！', {
          color: 'error',
        })
      }
    },
    emailMatchError() {
      return this.userInfo.oldPsw === this.userInfo.password
        ? ''
        : '两遍密码不一致，请重新填写！'
    },
    // confirmPsw() {
    //   if (this.userInfo.oldPsw !== this.userInfo.password) {
    //     this.userInfo.oldPsw = ''
    //     $Vue.$dialogLoader.showSnackbar('两遍密码不一致，请重新填写！', { color: 'error' })
    //   }
    // }
  },
}
</script>

<style lang="scss" scoped>
.addForm {
  width: 500px;
}
.form-btns .v-btn {
  width: 150px;
}
</style>
