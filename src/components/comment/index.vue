<template>
  <div class="mb-16">
    <div
      class="mt-16 mb-2 text-h5 grey--text text--darken-3 d-flex justify-lg-space-between"
    >
      评论
    </div>
    <v-divider class="primary mb-4"></v-divider>
    <v-form ref="addForm" v-model="valid" lazy-validation>
      <v-textarea
        v-model="comment.content"
        height="100"
        :hint="hint"
        :placeholder="placeText"
        :disabled="!token"
        filled
      ></v-textarea>
    </v-form>
    <div class="form-btns d-flex justify-lg-space-between mt-2 mx-auto">
      <v-btn
        color="primary"
        class="mr-4"
        large
        @click="submit"
        :disabled="!token"
      >
        提交
      </v-btn>
      <v-btn
        color="secondary"
        large
        @click="() => commonApi.resetForm(this)"
        :disabled="!token"
      >
        重置
      </v-btn>
    </div>
    <div class="my-2 text-h5" id="comment-list">评论列表</div>
    <v-divider class="primary mb-4"></v-divider>
    <div class="comment-container">
      <div v-for="(item, i) in list" :key="item._id" class="comment-thread">
        <div class="comment-post py-4">
          <div class="comment-avatar">
            <v-img
              :src="realUrl + item.uid.avatar"
              width="50"
              height="50"
            ></v-img>
          </div>
          <div class="comment-body">
            <div class="comment-user">
              <div class="comment-user-name">
                <a>{{ item.uid.nickname }}</a>
              </div>
              <div class="reply-name" style="display: none"></div>
              <div class="comment-floor">{{ i + 1 }}楼</div>
            </div>
            <div class="comment-text" style="cursor: auto">
              {{ item.content }}
            </div>
            <div class="comment-footer">
              <span class="comment-time">{{
                item.created_time | parseTime('{y}-{m}-{d} {h}:{i}')
              }}</span>
              <span
                class="comment-like pl-4"
                @click="addLike(item._id, item.like)"
                ><v-icon x-small class="mr-1">mdi-thumb-up</v-icon
                >{{ item.like }}</span
              >
              <span class="comment-report pl-4"
                ><v-icon small class="mr-1">mdi-flag</v-icon>举报</span
              >
              <span
                v-if="item.uid._id === userId"
                class="comment-delete pl-4"
                @click="
                  () =>
                    commonApi.handleDelete(deleteApi, item._id, type, () => {
                      commentCB('$pull', item._id)
                    })
                "
                ><v-icon small class="mr-1">mdi-trash</v-icon>删除</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-pagination
      v-if="total > 5"
      v-model="currentPage"
      :length="pageLength"
      @input="updatePage"
    >
    </v-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserId } from '@/utils/auth'
import { getComments, addComment, deleteComment } from '@/api/comment'
import { addGuide } from '@/api/guide'
import { addBoard } from '@/api/board'
import { addTurnip } from '@/api/turnip'
import { addTrade } from '@/api/trade'

export default {
  name: 'Comment',
  props: {
    type: { type: String, default: 'guide' },
    hint: { type: String, default: '有什么想说的，尽情留下吧' },
    defaultText: { type: String, default: '请输入' },
  },
  data() {
    return {
      valid: false,
      list: [],
      total: 0,
      currentPage: 1,
      queryInfo: {
        page: 1,
        pageSize: 5,
        aid: '',
        query: '',
      },
      comment: {
        aid: '', // 文章id
        uid: '', // 登录用户id
        content: '',
      },
      deleteApi: deleteComment,
    }
  },
  watch: {
    queryInfo: {
      deep: true,
      handler(newV) {
        this.getList()
      },
    },
  },
  computed: {
    ...mapGetters(['userId', 'token']),
    isLogin() {
      const userId = getUserId()
      let bl = false
      userId ? (bl = true) : (bl = false)
      return bl
    },
    placeText() {
      let text = ''
      if (getUserId()) {
        text = this.defaultText
      } else {
        text = '请先登陆后再发表评论( · ω · )'
      }
      return text
    },
    aid() {
      return this.$route.params.id
    },
    addFun() {
      let fun = null
      switch (this.type) {
        case 'guide':
          fun = addGuide
          break
        case 'board':
          fun = addBoard
          break
        case 'turnip':
          fun = addTurnip
          break
        case 'trade':
          fun = addTrade
          break
      }
      return fun
    },
    pageLength() {
      return parseInt(this.total / this.queryInfo.pageSize) + 1
    },
  },
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    getList() {
      this.queryInfo.aid = this.aid
      getComments(this.type, this.queryInfo).then(response => {
        this.list = response.data.list
        this.total = response.data.total || 0
      })
    },
    updatePage() {
      this.queryInfo.page = this.currentPage
    },
    addLike(id, like) {
      this.comment.aid = this.aid
      this.comment.uid = this.userId
      this.comment._id = id
      this.comment.like = like + 1
      delete this.comment.content
      addComment(this.type, this.comment)
        .then(res => {
          this.commonApi.resetForm(this)
          this.getList()
        })
        .catch(err =>
          $Vue.$dialogLoader.showSnackbar(err.message, { color: 'error' })
        )
    },
    commentCB(type, cid) {
      this.addFun({ _id: this.aid, [type]: { comments: cid } })
      this.getList()
      this.$emit('change-comment')
    },
    submit() {
      if (this.$refs.addForm.validate()) {
        this.comment.aid = this.aid
        this.comment.uid = this.userId
        delete this.comment._id
        delete this.comment.like
        addComment(this.type, this.comment)
          .then(res => {
            $Vue.$dialogLoader.showSnackbar(res.message, {
              color: 'success',
            })
            this.commonApi.resetForm(this)
            this.commentCB('$push', res.data._id)
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

.comment-container-top:not([disabled]) + .comment-container > div:first-child {
  border-top: 0;
}
.comment-thread {
  border-top: 1px solid rgba(0, 0, 0, 0.13);
}
.comment-avatar {
  float: left;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  overflow: hidden;
}
.comment-body {
  padding-left: 74px;
}
.comment-user {
  position: relative;
  color: #777;
  display: flex;
  align-items: center;
}
.comment-user a {
  color: #777 !important;
  font-size: 14px;
}
.comment-user-name {
  font-family: MicrosoftYaHei-Bold;
  font-size: 14px;
  color: #6d757a;
  font-weight: bold;
}
.comment-user-name a {
  color: #6d757a;
}
.comment-user .comment-floor {
  position: absolute;
  right: 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.35);
}
.comment-text {
  font-size: 14px;
  line-height: 1.5em;
  margin-top: 8px;
  word-wrap: break-word;
  position: relative;
  overflow: hidden;
  min-height: 1em;
  color: rgba(0, 0, 0, 0.85);
}
.comment-text-mobile {
  display: none;
  font-size: 14px;
  line-height: 1.5em;
  margin-top: 8px;
  word-wrap: break-word;
  position: relative;
  overflow: hidden;
  min-height: 1em;
  color: rgba(0, 0, 0, 0.85);
}
.comment-footer {
  font-family: MicrosoftYaHei;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.35);
  line-height: 20px;
  padding-top: 12px;
}
.comment-footer > span .v-icon {
  color: rgba(0, 0, 0, 0.35);
  opacity: 0.6;
  transition: opacity 0.15s linear 0s;
  cursor: pointer;
}
.comment-footer > span .v-icon:hover {
  opacity: 1;
}
.comment-post .comment-report {
  display: none;
}
.comment-post:hover .comment-report,
.comment-report[reported] {
  display: initial;
  opacity: 1;
}
</style>
