<template>
  <v-container class="bgWht" elevation-4>
    <bread-crumbs :bread-nav="breadNav"></bread-crumbs>
    <list-header title="发布我的交易信息" :tips="tips" hasTip> </list-header>
    <v-form
      ref="addForm"
      v-model="valid"
      lazy-validation
      class="turnip-form pa-16"
    >
      <v-row>
        <v-col cols="4">
          <!-- <cascader-multi v-model="newTrade.exchangeType" @on-change="onchange" :data="" multiple></cascader-multi> -->
          <Cascader
            :data="exchangeOption"
            v-model="newTrade.exchangeTypeArray"
            placeholder="请选择交易类型"
          ></Cascader>
        </v-col>
        <v-col cols="4">
          <TimePicker
            type="time"
            v-model="newTrade.chooseTime"
            format="HH点mm分ss秒"
            :steps="[1, 15, 15]"
            placeholder="请选择截止时间"
            style="width: 100%"
          ></TimePicker>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-switch
            v-model="newTrade.isLineup"
            :label="`排队模式：${newTrade.isLineup ? '是' : '否'}`"
            color="primary"
            class="mt-0 pt-0"
          ></v-switch>
        </v-col>
        <v-col v-if="isLineBL" cols="4">
          <v-switch
            v-model="newTrade.isPublic"
            :label="`是否公开：${newTrade.isPublic ? '是' : '否'}`"
            color="primary"
            hide-details
            class="mt-0 pt-0"
          ></v-switch>
        </v-col>
        <v-col v-if="isLineBL" cols="4">
          <v-switch
            v-model="newTrade.isAuto"
            :label="`是否自动叫号：${newTrade.isAuto ? '是' : '否'}`"
            color="primary"
            hide-details
            class="mt-0 pt-0"
          ></v-switch>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-if="isLineBL && isAutoBL" cols="4">
          <v-text-field
            v-model="newTrade.maxPeople"
            label="最大登岛人数限制"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col v-if="isLineBL && isAutoBL" cols="4">
          <v-text-field
            v-model="newTrade.maxTime"
            label="登岛超时时间(分钟)"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col v-if="!isLineBL" cols="4">
          <v-radio-group v-model="newTrade.contact" label="联系方式" row>
            <v-radio label="SW" value="SW"></v-radio>
            <v-radio label="微信" value="微信"></v-radio>
            <v-radio label="QQ" value="QQ"></v-radio>
            <v-radio label="开岛密码" value="开岛密码"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col v-if="!isLineBL" cols="4">
          <v-text-field
            v-model="newTrade.contactDetail"
            :label="newTrade.contact"
            :placeholder="'请输人' + contact"
            required
          ></v-text-field>
        </v-col>
        <v-col v-if="isLineBL" cols="4">
          <v-text-field
            v-model="newTrade.psw"
            label="开岛密码"
            placeholder="请输入"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="newTrade.detail"
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
import { Cascader, TimePicker } from 'view-design'
import { addTrade } from '@/api/trade'
import { timestamp, parseTime } from '@/utils'

Vue.component('Cascader', Cascader)
Vue.component('TimePicker', TimePicker)

export default {
  name: 'TradeAdd',
  data() {
    return {
      valid: false,
      newTrade: {
        user: '',
        exchangeTypeArray: [],
        exchangeType: '', // 交易类型，我有菜/我有价
        chooseTime: '',
        validTime: '',
        isLineup: true, //是否排队模式
        isPublic: true, //是否公开
        isAuto: true, //自动叫号
        maxPeople: 2, // 登岛人数限制
        maxTime: 10, // 登岛最长时间 单位（分钟）
        contact: 'SW', // 联系方式
        contactDetail: '', //详细联系方式
        detail: '', // 上岛说明
        psw: '',
      },
      formRules: {
        require: [v => !!v || '不能为空！'],
      },
      exchangeOption: [
        {
          value: '交易',
          label: '交易',
          children: [
            { value: '家具相关', label: '家具相关' },
            { value: '服饰相关', label: '服饰相关' },
            { value: '材料相关', label: '材料相关' },
            { value: 'DIY手册相关', label: 'DIY手册相关' },
            { value: '活动相关', label: '活动相关' },
            { value: '花卉相关', label: '花卉相关' },
            { value: '其他', label: '其他' },
          ],
        },
        {
          value: '特殊NPC',
          label: '特殊NPC',
          children: [
            { value: '傅珂(妹妹)', label: '傅珂(妹妹)' },
            { value: '骆岚(壁纸地板)', label: '骆岚(壁纸地板)' },
            { value: '薛革(鞋袜包包)', label: '薛革(鞋袜包包)' },
            { value: '绢儿(服装)', label: '绢儿(服装)' },
            { value: '狐利(艺术品)', label: '狐利(艺术品)' },
            { value: '然然(园艺)', label: '然然(园艺)' },
            { value: '其他', label: '其他' },
          ],
        },
      ],
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
          text: '交易区',
          disabled: false,
          href: '/community/trade',
        },
        {
          text: '发布我的交易信息',
          disabled: true,
          href: '/community/trade/add',
        },
      ],
      tips: '交易区禁止发布虚假信息，禁止现金交易，拉私群，违规者永久封禁账号。望发布信息的各位森友遵守规则。',
    }
  },
  computed: {
    ...mapGetters(['userId']), //推荐这种
    isLineBL() {
      let bl = false
      this.newTrade.isLineup === true ? (bl = true) : (bl = false)
      return bl
    },
    isAutoBL() {
      let bl = false
      this.newTrade.isAuto === true ? (bl = true) : (bl = false)
      return bl
    },
    contact() {
      let text = '直接输入12位好友编号(无需-分割)'
      this.newTrade.contact !== 'SW'
        ? (text = '联系方式')
        : '直接输入12位好友编号(无需-分割)'
      return text
    },
  },
  methods: {
    // allowedDates: val => Date.parse(val) > Date.now() - 8.64e7,
    submit() {
      this.getTimeVal()
      if (!this.newTrade.validTime) {
        return $Vue.$dialogLoader.showSnackbar('请选择截止时间', {
          color: 'error',
        })
      }
      if (this.$refs.addForm.validate()) {
        this.newTrade.user = this.userId
        if (this.newTrade.isLineup === false) {
          this.newTrade.isPublic = false
          this.newTrade.isAuto = false
        }
        this.newTrade.exchangeType = this.newTrade.exchangeTypeArray.join('-')
        addTrade(this.newTrade)
          .then(res => {
            $Vue.$dialogLoader.showSnackbar(res.message, {
              color: 'success',
            })
            this.commonApi.resetForm(this)
            this.$router.push('/community/trade')
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
      let today = new Date()
      let hours = today.getHours
      let mintutes = today.getMinutes()
      let seconds = today.getSeconds()
      let todayString = parseTime(today)
      if (this.newTrade.chooseTime) {
        let chooseTime = this.newTrade.chooseTime.replace('点', ':')
        chooseTime = chooseTime.replace('分', ':')
        chooseTime = chooseTime.replace('秒', '')
        todayString = todayString.substring(0, 11) + chooseTime
        this.newTrade.validTime = timestamp(todayString)
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
