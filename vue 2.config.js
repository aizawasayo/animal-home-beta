const path = require('path')

const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

// gzip 压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const name = '动森之家' // page title
// 如果端口设置为80，
// 使用管理员权限执行命令行。
// 例如，Mac: sudo npm
// 可以通过以下方法更改端口:
// port = 1019 npm run dev OR npm run dev --port = 1019
const port = process.env.port || process.env.npm_config_port || 1019 // dev port

// 样式和js的CDN外链，会插入到index.html中
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: [],
  },
  // 生产环境
  build: {
    css: [],
    js: ['https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js'],
  },
  // build: {
  //   css: ['https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css'],
  //   js: ['https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js', 'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js']
  // }
}

const externals = {
  vue: 'Vue',
  // vuetify: 'Vuetify'
}

module.exports = {
  // publicPath:
  // process.env.NODE_ENV !== 'development' ? 'https://cdn.jsdelivr.net/gh/aizawasayo/cdn-animal-admin-beta/dist/' : '/',
  assetsDir: 'static',
  lintOnSave: !IS_PROD,
  transpileDependencies: ['vuetify'], // 通过 Babel 显式转译哪些依赖
  productionSourceMap: false,
  // runtimeCompiler: true, // 设置为 true 后就可以在 Vue 组件中使用 template 选项了
  configureWebpack: config => {
    const plugins = []
    if (IS_PROD) {
      plugins.push(
        new CompressionWebpackPlugin({
          // filename: '[path][base].gz',
          filename(pathData) {
            // `pathData` 参数包含很多可以获取到文件路径相关数据的属性 - `path`/`name`/`ext`/等等
            // 如果路径中包含svg，则放到svg/目录下
            // 只是演示，一般都用字符串默认值就好
            if (/\.svg$/.test(pathData.ext)) {
              return 'static/svg/[base].gz'
            }
            return '[path][base].gz'
          },
          algorithm: 'gzip',
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false, // 是否删除原始文件只保留压缩后的文件
        }),
        new BundleAnalyzerPlugin()
      )
      config.externals = externals
    } else {
      config.mode = 'development'
    }

    config.name = name
    config.plugins = [...config.plugins, ...plugins]
  },
  chainWebpack: config => {
    // 修复 HMR
    config.resolve.symlinks(true)

    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial',
      },
    ])
    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    if (IS_PROD) {
      config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use('file-loader')
        .loader('file-loader')
        .options({
          name: 'static/img/[name].[hash:8].[ext]',
          // outputPath: 'static/img'
        })
        .end()
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          mozjpeg: { progressive: true, quality: 65 },
          optipng: { enabled: true },
          pngquant: { quality: [0.65, 0.9], speed: 4 },
          gifsicle: { interlaced: false },
          // webp: { quality: 75 }
        })
        .end()
        .enforce('post') // 表示先执行配置在下面那个loader

      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // 把单独抽出的 `runtime` 内联到 index.html
            inline: /runtime\..*\.js$/,
          },
        ])
        .end()

      config.optimization.runtimeChunk('single')

      config.optimization.splitChunks({
        chunks: 'all', // 若值为'async'表示只提取异步加载（即动态import()）的模块
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10, // 优先级，数字越大权重越高
            chunks: 'initial', // 只打包最初依赖的包，即只从入口模块进行拆分
          },
          vuetify: {
            name: 'chunk-vuetify',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?vuetify(.*)/,
          },
          commons: {
            name: 'chunk-commons',
            minChunks: 2, //  不同 chunk 引入次数超过两次才提取
            priority: 5,
            reuseExistingChunk: true, // 如果当前包已经从主包里分离出来，它将被重用，而不会再次生成一个新的
          },
        },
      })

      // 添加 cdn 参数到 htmlWebpackPlugin 配置中
      config.plugin('html').tap(args => {
        args[0].cdn = cdn.build
        args[0].title = '动森之家'
        return args
      })
      // config.optimization.minimizer = [
      // ]
    }
  },
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        // target: `http://localhost:1016`,
        target: process.env.VUE_APP_REAL_API,
        changeOrigin: true,
        // ws: true, // 是否启用websockets
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '',
        },
      },
    },
    sockHost: process.env.VUE_APP_REAL_API,
    // after: require('./mock/mock-server.js')
  },
}
