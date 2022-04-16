<template>
  <div class="form-btns d-flex justify-lg-space-between mx-auto my-16">
    <span
      v-if="type === 'guide' || type === 'board'"
      :class="isLike ? 'activeColor' : ''"
      @click="addLike"
    >
      <v-icon medium class="mr-1" :color="isLike ? '#00bcd4' : ''"
        >mdi-thumb-up-outline</v-icon
      >{{ likes ? likes.length : '0' }}
    </span>
    <span @click="goAnchor('comment-list')">
      <v-icon medium class="mr-1">mdi-comment-text-outline</v-icon>
      {{ comments ? comments.length : '0' }}
    </span>
    <span @click="addFavorite">
      <v-icon medium class="mr-1" :color="isFavorite ? '#00bcd4' : ''"
        >mdi-star-outline</v-icon
      >
    </span>
    <span>
      <v-icon medium class="mr-1">mdi-share-variant-outline</v-icon>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserId } from '@/utils/auth'
import { getUser, editUser } from '@/api/user'
import { addGuide, getGuide } from '@/api/guide'
import { addBoard, getBoard } from '@/api/board'
import { addTurnip, getTurnip } from '@/api/turnip'
import { addTrade, getTrade } from '@/api/trade'
import { textFilter } from '@/utils/'

export default {
  name: 'Operation',
  props: {
    type: { type: String, default: 'guide' },
    title: { type: String, default: '' },
  },
  data() {
    return {
      valid: false,
      likes: [],
      comments: [],
      favorites: [],
    }
  },
  watch: {},
  computed: {
    ...mapGetters(['userId']),
    isLogin() {
      const userId = getUserId()
      let bl = false
      userId ? (bl = true) : (bl = false)
      return bl
    },
    aid() {
      return this.$route.params.id
    },
    isLike() {
      return this.isLogin && this.likes.includes(this.userId)
    },
    routePath() {
      return `/detail/${this.type}/${this.aid}`
    },
    isFavorite() {
      const favorited = this.favorites.filter(f => f.path === this.routePath)
      return favorited.length >= 1
    },
    getFuns() {
      let getFun = null
      let addFun = null
      switch (this.type) {
        case 'guide':
          getFun = getGuide
          addFun = addGuide
          break
        case 'board':
          getFun = getBoard
          addFun = addBoard
          break
        case 'turnip':
          getFun = getTurnip
          addFun = addTurnip
          break
        case 'trade':
          getFun = getTrade
          addFun = addTrade
          break
      }
      return { getFun, addFun }
    },
  },
  created() {
    this.getUserFavorites()
    this.getDetail()
  },
  mounted() {},
  methods: {
    getUserFavorites() {
      if (this.isLogin) {
        getUser(this.userId).then(respone => {
          this.favorites = respone.data.favorites || []
        })
      }
    },
    getDetail() {
      this.getFuns.getFun(this.aid).then(response => {
        const { comments, likes } = response.data
        this.comments = comments || []
        this.likes = likes || []
      })
    },
    goAnchor(id) {
      document.querySelector('#' + id).scrollIntoView()
    },
    async goLogin() {
      if (
        await $Vue.$confirm('提示', '需要先登录', {
          color: 'warning',
          agreeText: '去登录',
        })
      ) {
        this.$router.push('/login')
      }
    },
    addLike() {
      if (!this.isLogin) {
        // 点赞需要登录状态
        this.goLogin()
        return
      }
      let condition = { _id: this.aid }
      if (this.isLike) {
        condition['$pull'] = { likes: this.userId }
      } else {
        condition['$addToSet'] = { likes: this.userId }
      }
      this.getFuns.addFun(condition).then(res => this.getDetail())
    },

    addFavorite() {
      if (!this.isLogin) {
        return this.goLogin()
      }
      let condition = {}
      const title = textFilter(this.title, 30)
      if (this.isFavorite) {
        condition['$pull'] = { favorites: { title, path: this.routePath } }
      } else {
        condition['$addToSet'] = { favorites: { title, path: this.routePath } }
      }
      editUser(this.userId, condition).then(res => {
        this.getUserFavorites()
        this.getDetail()
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.form-btns {
  width: 300px;
}
.form-btns .v-btn {
  width: 150px;
}
.activeColor {
  color: #00bcd4;
}
</style>
