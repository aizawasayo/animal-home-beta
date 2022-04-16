<template>
  <v-card>
    <v-tabs
      v-model="communityTab"
      background-color="transparent"
      class="elevation-0 community"
    >
      <v-card-title class="white--text no-bg">
        <v-icon left> mdi-bulletin-board </v-icon>
        <span class="title font-weight-bold">社区</span>
      </v-card-title>
      <v-tabs-slider></v-tabs-slider>
      <v-tab
        v-for="(item, i) in communityTabs"
        :key="item + i"
        :href="`#${item.type}`"
        @click="tabClick($event, item.type)"
      >
        {{ item.text }}
      </v-tab>
      <v-btn large text class="btn-more" color="white" @click="goDetail"
        >更多<v-icon small right>mdi-more</v-icon></v-btn
      >
      <v-tab-item value="board">
        <v-card-text>
          <v-simple-table fixed-header height="300px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left text-subtitle-2">话题</th>
                  <th class="text-left text-subtitle-2">标题</th>
                  <th class="text-left text-subtitle-2">时间</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in boardList" :key="item._id + i">
                  <td class="cyan--text text--lighten-2">
                    <v-chip
                      :color="item.color ? item.color : 'secondary'"
                      outlined
                    >
                      <v-avatar left>
                        <v-icon v-if="item.icon">
                          {{ 'mdi-' + item.icon }}</v-icon
                        >
                        <v-icon v-else>mdi-sprout</v-icon>
                      </v-avatar>
                      {{ item.topic }}
                    </v-chip>
                  </td>
                  <td>
                    <router-link :to="'/detail/board/' + item._id">{{
                      item.content | textFilter(15)
                    }}</router-link>
                  </td>
                  <td>
                    {{ item.created_time | parseTime('{y}-{m}-{d} {h}:{i}') }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-tab-item>
      <v-tab-item value="turnip">
        <v-card-text>
          <v-simple-table fixed-header height="300px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left text-subtitle-2">交易方式</th>
                  <th class="text-left text-subtitle-2">价格</th>
                  <th class="text-left text-subtitle-2">内容</th>
                  <th class="text-center text-subtitle-2">联系方式</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in turnipList" :key="item._id + i">
                  <td>
                    <v-chip
                      :color="
                        item.exchangeType === '我有菜' ? 'primary' : 'secondary'
                      "
                      text-color="white"
                    >
                      <v-avatar left>
                        <v-icon v-if="item.exchangeType === '我有价'"
                          >mdi-currency-usd-circle</v-icon
                        >
                        <v-icon v-else>mdi-sprout</v-icon>
                      </v-avatar>
                      {{ item.exchangeType }}
                    </v-chip>
                  </td>
                  <td>{{ item.price }}</td>
                  <td>
                    <router-link :to="'/detail/turnip/' + item._id">{{
                      item.detail | textFilter(20)
                    }}</router-link>
                  </td>
                  <td class="text-center">
                    <v-btn class="cyan--text text--lighten-2" text>{{
                      item.isLineup === true ? '立即上岛' : '立即联系'
                    }}</v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-tab-item>
      <v-tab-item value="trade">
        <v-card-text>
          <v-simple-table fixed-header height="300px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left text-subtitle-2">交易方式</th>
                  <th class="text-left text-subtitle-2">内容</th>
                  <th class="text-center text-subtitle-2">联系方式</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in tradeList" :key="item._id + i">
                  <td class="cyan--text text--lighten-2">
                    <v-chip
                      :color="
                        item.exchangeType.indexOf('特殊NPC') > -1
                          ? 'primary'
                          : 'secondary'
                      "
                      text-color="white"
                    >
                      {{ item.exchangeType }}
                    </v-chip>
                  </td>
                  <td>
                    <router-link :to="'/detail/trade/' + item._id">{{
                      item.detail | textFilter(18)
                    }}</router-link>
                  </td>
                  <td class="text-center">
                    <v-btn class="cyan--text text--lighten-2" text>{{
                      item.isLineup === true ? '立即上岛' : '立即联系'
                    }}</v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import { getBoardList } from '@/api/board'
import { getTurnipList } from '@/api/turnip'
import { getTradeList } from '@/api/trade'
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        page: 1, // 当前的页数
        pageSize: 5, // 当前每页显示多少条数据
      },
      communityTab: null,
      communityTabs: [
        { text: '森友墙', type: 'board' },
        { text: '菜市场', type: 'turnip' },
        { text: '交易区', type: 'trade' },
      ],
      boardList: [],
      turnipList: [],
      tradeList: [],
    }
  },
  computed: {},
  created() {
    this.getBoard()
  },
  methods: {
    getBoard() {
      getBoardList(this.queryInfo).then(response => {
        this.boardList = response.data.list
      })
    },
    getTurnip() {
      getTurnipList(this.queryInfo).then(response => {
        this.turnipList = response.data.list
      })
    },
    getTrade() {
      getTradeList(this.queryInfo).then(response => {
        this.tradeList = response.data.list
      })
    },
    tabClick(e, type) {
      switch (type) {
        case 'board':
          this.getBoard()
          break
        case 'turnip':
          this.getTurnip()
          break
        case 'trade':
          this.getTrade()
          break
      }
    },
    goDetail() {
      this.$router.push('/community/' + this.communityTab)
    },
  },
}
</script>

<style lang="scss" scoped>
.theme--light.v-data-table.v-data-table--fixed-header thead th {
  background: transparent;
}
.theme--light.v-tabs-items {
  background-color: transparent;
}
</style>
