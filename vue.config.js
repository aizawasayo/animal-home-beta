const { defineConfig } = require('@vue/cli-service')
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const CompressionPlugin = require('compression-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  lintOnSave: !IS_PROD,
  productionSourceMap: false,
  // publicPath:
  //   IS_PROD
  //     ? 'https://cdn.jsdelivr.net/gh/aizawasayo/cdn-animal-admin-beta/dist/'
  //     : '/',
  configureWebpack: config => {
    const plugins = []
    plugins.push(require('unplugin-vue-components/webpack')())

    if (IS_PROD) {
      plugins.push(
        new CompressionPlugin({
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
        new ImageMinimizerPlugin({
          minimizerOptions: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
            ],
          },
        }),
        new BundleAnalyzerPlugin()
      )
    }

    config.plugins = [...config.plugins, ...plugins]
  },
  chainWebpack: config => {
    if (IS_PROD) {
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
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: `chunk-libs`,
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial',
          },
          common: {
            name: `chunk-common`,
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      })
    }
  },
  devServer: {
    // compress: true, // 默认值
    port: 1229,
    open: true,
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        // target: `http://localhost:1016`,
        target: process.env.VUE_APP_REAL_API,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '',
        },
      },
    },
  },
})
