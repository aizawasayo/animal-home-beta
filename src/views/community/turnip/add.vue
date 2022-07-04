<template>
  <v-container class="bgWht" elevation-4>
    <bread-crumbs :bread-nav="breadNav"></bread-crumbs>
    <list-header title="发布我的大头菜信息" :tips="tips" hasTip> </list-header>
    <v-form
      ref="addForm"
      v-model="valid"
      lazy-validation
      class="turnip-form pa-16"
    >
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="newTurnip.price"
            :rules="formRules.require"
            label="菜价"
            placeholder="请输入"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="newTurnip.exchangeType"
            label="交易类型"
            :rules="formRules.require"
            row
          >
            <v-radio label="我有菜" value="我有菜"></v-radio>
            <v-radio label="我有价" value="我有价"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="4">
          <TimePicker
            v-model="newTurnip.chooseTime"
            type="time"
            format="HH点mm分ss秒"
            :steps="[1, 15, 15]"
            placeholder="请选择截止时间"
            style="width: 100%"
          ></TimePicker>
        </v-col>
        <v-col v-if="isPrice" cols="4">
          <v-switch
            v-model="newTurnip.isLineup"
            :label="`排队模式：${newTurnip.isLineup ? '是' : '否'}`"
            color="primary"
            class="mt-0 pt-0"
          ></v-switch>
        </v-col>
        <v-col v-if="isLineBL" cols="4">
          <v-switch
            v-model="newTurnip.isPublic"
            :label="`是否公开：${newTurnip.isPublic ? '是' : '否'}`"
            color="primary"
            hide-details
            class="mt-0 pt-0"
          ></v-switch>
        </v-col>
        <v-col v-if="isLineBL" cols="4">
          <v-switch
            v-model="newTurnip.isAuto"
            :label="`是否自动叫号：${newTurnip.isAuto ? '是' : '否'}`"
            color="primary"
            hide-details
            class="mt-0 pt-0"
          ></v-switch>
        </v-col>
        <v-col v-if="isLineBL && isAutoBL" cols="4">
          <v-text-field
            v-model="newTurnip.maxPeople"
            label="最大登岛人数限制"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col v-if="isLineBL && isAutoBL" cols="4">
          <v-text-field
            v-model="newTurnip.maxTime"
            label="登岛超时时间(分钟)"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col v-if="!isPsw" cols="4">
          <v-radio-group v-model="newTurnip.contact" label="联系方式" row>
            <v-radio label="SW" value="SW"></v-radio>
            <v-radio label="微信" value="微信"></v-radio>
            <v-radio label="QQ" value="QQ"></v-radio>
            <v-radio label="开岛密码" value="开岛密码"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col v-if="!isPsw" cols="4">
          <v-text-field
            v-model="newTurnip.contactDetail"
            :label="newTurnip.contact"
            :placeholder="'请输人' + contact"
            required
          ></v-text-field>
        </v-col>
        <v-col v-if="isPsw" cols="4">
          <v-text-field
            v-model="newTurnip.psw"
            label="开岛密码"
            placeholder="请输入"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="newTurnip.detail"
            height="100"
            label="上岛说明"
            hint="门票、报酬等等，需要补充的内容都填这里"
            placeholder="请输入"
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
import { TimePicker } from 'view-design'
import { addTurnip } from '@/api/turnip'
import { timestamp, parseTime } from '@/utils'

Vue.component('TimePicker', TimePicker)

export default {
  name: 'TurnipAdd',
  data() {
    return {
      valid: false,
      newTurnip: {
        price: null,
        user: '',
        exchangeType: '我有价', // 交易类型，我有菜/我有价
        chooseTime: '',
        validTime: '',
        isLineup: true, // 是否排队模式
        isPublic: true, // 是否公开
        isAuto: true, // 自动叫号
        maxPeople: 2, // 登岛人数限制
        maxTime: 10, // 登岛最长时间 单位（分钟）
        contact: 'SW', // 联系方式
        contactDetail: '', //详细联系方式
        detail: '', // 上岛说明
        psw: '',
        comments: [],
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
          text: '社区',
          disabled: true,
          href: '/community',
        },
        {
          text: '菜市场',
          disabled: false,
          href: '/community/turnip',
        },
        {
          text: '发布我的大头菜信息',
          disabled: true,
          href: '/community/turnip/add',
        },
      ],
      tips: '菜市场用于村民们互助卖菜，大家可以留下自己的商店菜价等相关信息。禁止现金交易，拉私群，违规者永久封禁账号。望发布信息的各位森友遵守规则。',
    }
  },
  computed: {
    ...mapGetters(['userId']),
    isLineBL() {
      let bl = false
      this.newTurnip.isLineup === true &&
      this.newTurnip.exchangeType === '我有价'
        ? (bl = true)
        : (bl = false)
      return bl
    },
    contact() {
      let text = '直接输入12位好友编号(无需-分割)'
      this.newTurnip.contact !== 'SW'
        ? (text = '联系方式')
        : '直接输入12位好友编号(无需-分割)'
      return text
    },
    isAutoBL() {
      let bl = false
      this.newTurnip.isAuto === true ? (bl = true) : (bl = false)
      return bl
    },
    isPrice() {
      let bl = false
      this.newTurnip.exchangeType === '我有菜' ? (bl = false) : (bl = true)
      return bl
    },
    isPsw() {
      let bl = true
      this.newTurnip.exchangeType === '我有价' &&
      this.newTurnip.isLineup === true
        ? (bl = true)
        : (bl = false)
      return bl
    },
  },
  methods: {
    submit() {
      this.getTimeVal()
      if (!this.newTurnip.validTime) {
        return $Vue.$dialogLoader.showSnackbar('请选择截止时间', {
          color: 'error',
        })
      }
      if (this.$refs.addForm.validate()) {
        this.newTurnip.user = this.userId
        if (this.newTurnip.exchangeType === '我有菜') {
          this.newTurnip.isLineup = false
          this.isPublic = false
          this.isAuto = false
        }
        addTurnip(this.newTurnip)
          .then(res => {
            $Vue.$dialogLoader.showSnackbar(res.message, {
              color: 'success',
            })
            this.commonApi.resetForm(this)
            this.$router.push('/community/turnip')
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
    getTimeVal() {
      const today = new Date()
      const hours = today.getHours
      const mintutes = today.getMinutes()
      const seconds = today.getSeconds()
      let todayString = parseTime(today)
      if (this.newTurnip.chooseTime) {
        let chooseTime = this.newTurnip.chooseTime.replace('点', ':')
        chooseTime = chooseTime.replace('分', ':')
        chooseTime = chooseTime.replace('秒', '')
        todayString = todayString.substring(0, 11) + chooseTime
        this.newTurnip.validTime = timestamp(todayString)
      }
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
