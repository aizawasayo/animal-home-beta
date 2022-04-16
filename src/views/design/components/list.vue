<template>
  <v-data-iterator
    :items="list"
    :loading="loading"
    :options.sync="options"
    :server-items-length="total"
    :loading-text="preset.dataIterator.loadingText"
    :no-results-text="preset.dataIterator.noResultsText"
    :no-data-text="preset.noDataText"
    hide-default-footer
    class="mt-4"
  >
    <!-- <template v-slot:header> </template> -->
    <template v-slot:default="props">
      <v-row>
        <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6">
          <v-card :to="'/detail/design/' + item._id">
            <v-img
              :src="realUrl + item.photoSrc[0].src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="300px"
            >
              <v-card-title class="no-bg" v-text="item.name"></v-card-title>
            </v-img>
            <v-card-text class="text--primary">
              <div>{{ item.content | textFilter }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template v-slot:footer>
      <v-row
        class="mt-2 px-3"
        align="center"
        justify="center"
        style="margin-bottom: 0"
      >
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
        <v-btn small dark color="primary" class="mr-1" @click="formerPage">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn small dark color="primary" class="ml-1" @click="nextPage">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDesignList } from '@/api/design'

export default {
  name: 'DesignList',
  props: {
    type: {
      type: String,
      default: 'clothingDesign',
    },
  },
  data() {
    return {
      loading: true,
      total: 0,
      list: [],
      designType: this.type,
      options: {
        itemsPerPageArray: [4, 8, 12],
        page: 1,
        itemsPerPage: 4,
        // sortBy: 'name',
        // sortDesc: false
      },
    }
  },
  computed: {
    ...mapGetters(['preset']),
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
    // $route: {
    //   handler() {
    //     this.type = this.$route.query.type
    //     this.getList()
    //     // 深度监听，同时也可监听到param参数变化
    //   },
    //   deep: true
    // }
  },
  methods: {
    getList() {
      const queryInfo = {
        query: '',
        page: this.options.page,
        pageSize: this.options.itemsPerPage,
        // type: this.$route.query.type,
        type: this.type,
      }
      getDesignList(queryInfo).then(response => {
        this.list = response.data.list
        this.total = response.data.total || 0
      })
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
  },
}
</script>

<style lang="scss" scoped></style>
