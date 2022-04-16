<template>
  <v-toolbar
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
      :solo-inverted="!disableSortBtn"
      hide-details
      prepend-inner-icon="mdi-magnify"
      :style="{ width: searchWidth ? searchWidth : 'auto' }"
    ></v-text-field>
    <template v-if="!disableSortBtn && $vuetify.breakpoint.mdAndUp">
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

<script>
import eventBus from '@/utils/eventBus'
export default {
  name: 'ListToolbar',
  props: {
    typeName: String,
    configObj: Object,
    search: String,
    listFilters: { type: Object, default: () => ({}) },
    sortKey: {
      type: String,
      default: 'name',
    },
    sortVal: {
      type: Boolean,
      default: false,
    },
    disableSortBtn: {
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
  },
  data() {
    return {
      filters: this.listFilters,
      selectLists: this.configObj.selectLists,
    }
  },
  created() {
    if (this.configObj.getOptionKeys)
      this.commonApi.getOptionsByKeys(this.configObj.getOptionKeys, this)
  },
  computed: {
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
    query: {
      get() {
        return this.search
      },
      set(val) {
        this.$emit('update:search', val)
      },
    },
  },
  watch: {
    filters: {
      handler(val) {
        this.$emit('update:listFilters', val)
      },
      deep: true,
    },
  },
  methods: {
    clearFilters() {
      for (let key in this.filters) {
        this.filters[key] = ''
      }
    },
  },
}
</script>

<style></style>
