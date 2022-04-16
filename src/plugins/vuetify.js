import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import zhHans from 'vuetify/lib/locale/zh-Hans'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#009688',
        secondary: '#81C784',
        accent: '#7c77b9',
        error: '#FF5252',
        info: '#80DEEA',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
  lang: {
    locales: { zhHans },
    current: 'zhHans',
  },
  noDataText: '没有相关数据',
  dataIterator: {
    loadingText: '请稍候，数据加载中',
    noResultsText: '没有符合条件的数据',
  },
})
