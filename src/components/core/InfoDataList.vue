<template>
  <v-data-table
    :headers="configObj.headers"
    :items="list"
    :options.sync="options"
    :server-items-length="total"
    :loading="loading"
    :loading-text="preset.dataIterator.loadingText"
    :no-results-text="preset.dataIterator.noResultsText"
    :no-data-text="preset.noDataText"
    :footer-props="footer"
    class="elevation-1"
    @click:row="goDetail"
  >
    <template v-slot:item.photoSrc="{ item }">
      <v-img
        v-if="item.photoSrc.length > 0 && item.photoSrc[0].src"
        class="mx-auto"
        :src="realUrl + item.photoSrc[0].src"
        :height="configObj.itemPhotoSize || 50"
        :width="configObj.itemPhotoSize || 50"
        contain
      />
      <v-img
        v-else-if="item.photoSrc.length > 0 && item.photoSrc[0]"
        class="mx-auto"
        :src="realUrl + item.photoSrc"
        :height="configObj.itemPhotoSize || 50"
        :width="configObj.itemPhotoSize || 50"
        contain
      />
      <span v-else>未上传</span>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'
import eventBus from '@/utils/eventBus'

export default {
  name: 'InfoDataList',
  props: {
    type: String,
    typeName: String,
    configObj: Object,
    query: { type: String, default: '' },
    filters: { type: Object, default: () => ({}) },
    queryParams: { type: Object, default: () => ({}) },
    getListApi: Function,
    sortKey: {
      type: String | Array,
    },
    sortVal: {
      type: Boolean | Array,
    },
    listDataProcess: Function,
    disableDetail: { type: Boolean, default: false },
  },
  data() {
    return {
      loading: false,
      total: 0,
      list: [],
      options: {
        sortBy: this.sortKey
          ? Array.isArray(this.sortKey)
            ? this.sortKey
            : new Array(this.sortKey)
          : ['name'],
        sortDesc: this.sortVal
          ? Array.isArray(this.sortVal)
            ? this.sortVal
            : new Array(this.sortVal)
          : [false],
      },
      footer: {
        itemsPerPageText: '每页条数',
        showFirstLastPage: true,
        showCurrentPage: true,
        itemsPerPageOptions: this.configObj.perPageArray || [10, 20],
      },
    }
  },
  mounted() {
    // 添加 eventBus 监听器
    // eventBus.$on('change-query', val => {
    //   this.query = val
    // })
  },
  beforeDestroy() {
    // 移除 eventBus 监听器
    // eventBus.$off('change-query')
  },
  computed: {
    ...mapGetters(['preset']),
  },
  watch: {
    options: {
      handler(val) {
        this.$emit('update:options', val)
        this.getList()
      },
      deep: true,
    },
    query: {
      handler(val) {
        this.options.page = 1
        this.getList()
      },
      deep: true,
    },
    filters: {
      handler(val) {
        if (val.season && val.season.includes('全年')) {
          this.$emit('update:filters', { ...val, season: [] })
        } else {
          this.options.page = 1
          this.getList()
        }
      },
      deep: true,
    },
  },
  methods: {
    getList() {
      this.loading = true
      let sortDesc = !this.options.sortDesc[0] ? 1 : -1
      let sortJson = { [this.options.sortBy[0]]: sortDesc }

      const queryInfo = {
        page: this.options.page,
        query: this.query || '',
        pageSize: this.options.itemsPerPage,
        sort: JSON.stringify(sortJson),
        ...this.filters,
        ...this.queryParams,
      }
      this.getListApi(queryInfo).then(res => {
        this.list = res.data.list
        this.total = res.data.total || 0
        this.listDataProcess && this.listDataProcess(this.list)
        this.options.pageStop = Math.ceil(
          this.total / this.options.itemsPerPage
        )
        this.loading = false
      })
    },
    goDetail(item) {
      if (!this.disableDetail)
        this.$router.push(`/detail/${this.type}/` + item._id)
    },
  },
}
</script>

<style lang="scss"></style>
