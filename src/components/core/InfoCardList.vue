<template>
  <v-data-iterator
    :items="list"
    :loading="loading"
    :options.sync="options"
    :sort-by="sortBy"
    :sort-desc="sortDesc"
    :server-items-length="total"
    :loading-text="preset.dataIterator.loadingText"
    :no-results-text="preset.dataIterator.noResultsText"
    :no-data-text="preset.noDataText"
    hide-default-footer
    class="mt-4"
  >
    <template v-slot:header>
      <v-toolbar
        v-if="!disableToolbar"
        class="card-search mb-4"
        dark
        color="secondary"
        :prominent="configObj.prominent"
      >
        <template v-for="(filterItem, i) in configObj.filtersArr">
          <v-select
            v-model="filters[filterItem.key]"
            flat
            solo-inverted
            hide-details
            clearable
            :items="selectLists[filterItem.key + 'List']"
            :label="filterItem.text"
            :placeholder="filterItem.text"
            :multiple="filterItem.multiple"
          ></v-select>
          <v-spacer></v-spacer>
        </template>
        <v-btn
          v-if="!disableResetBtn"
          large
          depressed
          color="primary"
          @click="clearFilters"
        >
          重置全部筛选
        </v-btn>
        <v-spacer v-if="!disableResetBtn && !configObj.resetRight"></v-spacer>
        <v-text-field
          v-model="query"
          :label="'搜索' + typeName + '名字关键字'"
          clearable
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          :style="{ width: searchWidth ? searchWidth : 'auto' }"
          @input="searchList"
        ></v-text-field>
        <template v-if="$vuetify.breakpoint.mdAndUp">
          <v-spacer></v-spacer>
          <v-select
            v-model="sortBy"
            flat
            hide-details
            :items="configObj.sortKeys"
            label="按哪项排序"
          ></v-select>
          <v-spacer></v-spacer>
          <v-btn-toggle v-model="sortDesc" mandatory>
            <v-btn large depressed color="primary" :value="false">
              <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn large depressed color="primary" :value="true">
              <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
          </v-btn-toggle>
        </template>
      </v-toolbar>
    </template>

    <template v-slot:default="{ items }">
      <v-row>
        <v-col
          v-for="item in items"
          :key="item.name"
          cols="12"
          :sm="itemCol.sm"
          :md="itemCol.md"
          :lg="itemCol.lg"
        >
          <v-card :to="`/detail/${type}/${item._id}`">
            <slot name="default" :item="item"></slot>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <template v-slot:footer>
      <v-row class="mt-4 mb-4 px-3" align="center" justify="center">
        <span class="grey--text">每页显示</span>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              text
              color="primary"
              class="ml-2"
              v-bind="attrs"
              v-on="on"
            >
              {{ options.itemsPerPage }}
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(number, index) in options.itemsPerPageArray"
              :key="'pageArray' + index"
              @click="updateItemsPerPage(number)"
            >
              <v-list-item-title>{{ number }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <span class="mr-4 grey--text">
          页码 {{ options.page }} / {{ numberOfPages }}
        </span>
        <v-btn
          v-if="total > options.itemsPerPage"
          fab
          depressed
          dark
          color="primary"
          class="mr-1"
          @click="formerPage"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          v-if="total > options.itemsPerPage"
          fab
          depressed
          dark
          color="primary"
          class="ml-1"
          @click="nextPage"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'InfoCardList',
  props: {
    type: String,
    typeName: String,
    configObj: Object,
    listFilters: { type: Object, default: () => ({}) },
    getListApi: Function,
    sortKey: {
      type: String,
      default: 'name',
    },
    sortVal: {
      type: Boolean,
      default: false,
    },
    disableToolbar: {
      type: Boolean,
      default: false,
    },
    disableResetBtn: {
      type: Boolean,
      default: false,
    },
    searchWidth: {
      type: [String, Array],
      default: 'auto',
    },
    itemCol: {
      type: Object,
      default: () => {
        return { sm: 6, md: 4, lg: 3 }
      },
    },
    listDataProcess: Function,
  },
  data() {
    return {
      loading: false,
      total: 0,
      list: [],
      query: '',
      filters: this.listFilters,
      options: {
        itemsPerPageArray: this.configObj.pageArray || [4, 8, 12],
        page: 1,
        itemsPerPage: this.configObj.perPage || 8,
      },
      selectLists: this.configObj.selectLists,
    }
  },
  created() {
    this.getList()
    if (this.configObj.getOptionKeys)
      this.commonApi.getOptionsByKeys(this.configObj.getOptionKeys, this)
  },
  computed: {
    ...mapGetters(['preset']),
    sortBy: {
      get() {
        return this.sortKey
      },
      set(val) {
        this.$emit('update:sortKey', val)
      },
    },
    sortDesc: {
      get() {
        return this.sortVal
      },
      set(val) {
        this.$emit('update:sortVal', val)
      },
    },
    numberOfPages() {
      return Math.ceil(this.total / this.options.itemsPerPage)
    },
  },
  watch: {
    options: {
      handler() {
        this.getList()
      },
      deep: true,
    },
    filters: {
      handler(val) {
        this.$emit('listFilters', val)
        this.options.page = 1
        this.getList()
      },
      deep: true,
    },
  },
  methods: {
    getList() {
      this.loading = true
      let sortDesc = !this.sortDesc ? 1 : -1
      let sortJson = { [this.sortBy]: sortDesc }
      if (this.filters.season && this.filters.season.includes('全年')) {
        this.filters.season = []
      }
      const queryInfo = {
        page: this.options.page,
        query: this.query || '',
        pageSize: this.options.itemsPerPage,
        sort: JSON.stringify(sortJson),
        ...this.filters,
      }
      this.getListApi(queryInfo).then(res => {
        this.list = res.data.list
        this.total = res.data.total || 0
        this.listDataProcess && this.listDataProcess(this.list)
        this.loading = false
      })
    },
    searchList() {
      this.options.page = 1
      this.getList()
    },
    nextPage() {
      if (this.options.page + 1 <= this.numberOfPages) this.options.page += 1
    },
    formerPage() {
      if (this.options.page - 1 >= 1) this.options.page -= 1
    },
    updateItemsPerPage(number) {
      this.options.itemsPerPage = number
    },
    goDetail(item) {
      this.$router.push(`/detail/${this.type}/` + item._id)
    },
    clearFilters() {
      for (let key in this.filters) {
        this.filters[key] = ''
      }
    },
  },
}
</script>

<style lang="scss"></style>
