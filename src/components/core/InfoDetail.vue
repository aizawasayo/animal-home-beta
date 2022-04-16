<template>
  <v-container class="bgWht picList" elevation-4>
    <bread-crumbs :bread-nav="breadNavData"></bread-crumbs>
    <slot name="title" :title="titleText"></slot>
    <div
      v-if="loading"
      class="d-flex justify-center align-center"
      style="height: 300px"
    >
      <v-progress-circular indeterminate color="#80DEEA"></v-progress-circular>
    </div>

    <v-card v-else class="detail">
      <slot
        name="default"
        :detailInfo="detailInfo"
        :morePhoto="morePhoto"
      ></slot>
    </v-card>
    <operation
      v-if="hasInteract"
      :type="type"
      :title="detailInfo && detailInfo.detail"
    />
    <comment
      v-if="hasComment"
      :type="type"
      :default-text="commentDefault"
    ></comment>
    <v-spacer></v-spacer>
    <!-- <slot
      name="footer"
      :content="detailInfo.content ? detailInfo.content : ''"
    ></slot> -->
  </v-container>
</template>

<script>
export default {
  name: 'InfoDetail',
  props: {
    getDetailApi: Function,
    breadNav: Array,
    dataProcess: Function,
    type: String,
    hasInteract: Boolean,
    commentDefault: String,
  },
  data() {
    return {
      id: this.$route.params.id,
      loading: false,
      detailInfo: null,
      breadNavData: this.breadNav,
    }
  },
  computed: {
    morePhoto() {
      return this.detailInfo.photoSrc && this.detailInfo.photoSrc.length > 1
    },
    titleText() {
      let text = ''
      if (this.detailInfo) {
        if (this.$attrs.breadText) {
          text = this.$attrs.breadText
        } else if (this.detailInfo.name) {
          text = this.detailInfo.name
        }
      }
      return text
    },
    hasComment() {
      return (
        this.hasInteract &&
        !(this.detailInfo && this.detailInfo.comment_disabled)
      )
    },
  },
  created() {
    this.getDetail()
  },
  methods: {
    breadNavProcess() {
      this.breadNavData.push({
        text: this.$attrs.breadText
          ? this.$attrs.breadText
          : this.detailInfo.name,
        disabled: true,
        href: `/detail/${this.type}/${this.id}`,
      })
    },
    getDetail() {
      this.loading = true
      this.getDetailApi(this.id).then(response => {
        this.detailInfo = response.data
        this.dataProcess && this.dataProcess(this.detailInfo)
        this.breadNavProcess()
        this.loading = false
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
