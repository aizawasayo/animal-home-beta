const state = {
  preset: { // 修改预设在 new Vuetify 里配置无效，故先放在state里
    noDataText: '暂无相关数据',
    dataIterator: {
      loadingText: '请稍候，数据加载中',
      noResultsText: '没有符合条件的数据'
    },
  }
}

const mutations = {

}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}