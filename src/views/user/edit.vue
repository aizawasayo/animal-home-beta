<template>
  <v-container class="bgWht" elevation-4>
    <bread-crumbs :bread-nav="breadNav"></bread-crumbs>
    <list-header title="修改个人信息" :tips="tips" :has-tip="false">
    </list-header>
    <v-form ref="addForm" v-model="valid" lazy-validation class="pa-16">
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="userInfo.username"
            :rules="formRules.require"
            label="用户名"
            placeholder="请输入"
            disabled
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="userInfo.nickname"
            :rules="formRules.require"
            label="昵称"
            placeholder="请输入"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="userInfo.gameId"
            :rules="formRules.require"
            label="动森ID"
            placeholder="请输入"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-select
            v-model="userInfo.position"
            :items="positionList"
            label="岛屿位置"
            placeholder="请选择"
            :rules="formRules.require"
          >
          </v-select>
        </v-col>
        <v-col cols="4">
          <DatePicker
            type="date"
            v-model="userInfo.islandDate"
            placeholder="请选择登岛日期"
            style="width: 100%"
            @on-change="test"
          ></DatePicker>
          <!-- <v-datetime-picker
            label="请选择登岛日期"
            v-model="userInfo.startDate"
            :rules="formRules.require"
            datetime="Date"
            format="YYYY-MM-DD"
            :show-time-tab="false"
          ></v-datetime-picker> -->
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="userInfo.islandName"
            :rules="formRules.require"
            label="岛屿名称"
            placeholder="请输入"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-file-input
            accept="image/*"
            label="头像"
            :placeholder="userInfo.avatar ? '可修改' : '请上传'"
            prepend-icon="mdi-camera"
            @change="handleUpload"
            @click:clear="clearFiles"
          ></v-file-input>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="userInfo.signature"
            height="100"
            label="个性说明"
            hint="介绍下自己吧"
            placeholder="这个人很懒，什么都没有留下"
          ></v-textarea>
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
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { DatePicker } from 'view-design'
import { getUser, editUser } from '@/api/user'
import { upload } from '@/api/upload'
import { timestamp, standardTime } from '@/utils'

Vue.component('DatePicker', DatePicker)

export default {
  name: 'UserEdit',
  data() {
    return {
      valid: false,
      userInfo: {
        _id: '',
        username: '',
        nickname: '',
        gameId: '',
        islandDate: null,
        islandName: '',
        position: '',
        startDate: '',
        password: '',
        avatar: '',
        signature: '',
      },
      formRules: {
        require: [v => !!v || '不能为空！'],
      },
      positionList: [
        { text: '北半球', value: 'North' },
        { text: '南半球', value: 'South' },
      ],
      uploadPic: null,
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
          text: '修改个人信息',
          disabled: true,
          href: '/user/edit',
        },
      ],
      tips: '本页面用于动森玩家分享DIY设计(服装/帽子/图案均可)，图片格式接受jpg或png。',
    }
  },
  computed: {
    ...mapGetters(['userId']),
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      getUser(this.userId).then(res => {
        this.userInfo = res.data
        if (this.userInfo.startDate) {
          this.userInfo.islandDate = standardTime(this.userInfo.startDate)
        }
      })
    },
    submit() {
      if (this.$refs.addForm.validate()) {
        // 上传头像：如果avatar和uploadPic都没有， 那就不处理, 使用默认头像
        // 如果 uploadPic 存在表示新上传了，需要覆盖
        // 如果 uploadPic 为 null 则维持原值
        if (this.uploadPic !== null) {
          this.userInfo.avatar = this.uploadPic
        }
        this.userInfo.startDate = timestamp(this.userInfo.islandDate)
        editUser(this.userId, this.userInfo)
          .then(res => {
            $Vue.$dialogLoader.showSnackbar(res.message, {
              color: 'success',
            })
            this.commonApi.resetForm(this)
            this.$router.push('/user')
          })
          .catch(err =>
            $Vue.$dialogLoader.showSnackbar(err.message, {
              color: 'error',
            })
          )
      } else {
        this.valid = false
        $Vue.$dialogLoader.showSnackbar('信息有误，请重新填写！', {
          color: 'error',
        })
      }
    },
    handleUpload(file) {
      const formData = new FormData()
      if (file) {
        formData.append('avatar', file, file.name)
        upload(formData)
          .then(res => {
            if (res.code === 200) {
              $Vue.$dialogLoader.showSnackbar(res.message, {
                color: 'success',
              })
              let src = res.data.path
              src = src.replace('/public', '')
              this.uploadPic = src
            }
          })
          .catch(err =>
            $Vue.$dialogLoader.showSnackbar(err.message, {
              color: 'error',
            })
          )
      }
    },
    clearFiles() {
      this.uploadPic = null
    },
    test() {
      console.log(this.userInfo.startDate)
    },
  },
}
</script>

<style lang="scss" scoped>
.form-btns {
  width: 400px;
}
.form-btns .v-btn {
  width: 150px;
}
</style>
