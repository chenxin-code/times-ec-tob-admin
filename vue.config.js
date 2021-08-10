const path = require('path')
const webpack = require('webpack')
const buildDate = JSON.stringify(new Date().toLocaleString())
const createThemeColorReplacerPlugin = require('./config/plugin.config')
const CompressionWebpackPlugin = require('compression-webpack-plugin') // 开启gzip压缩， 按需引用
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i // 开启gzip压缩， 按需写入
const sh = require('./.sh')
const ENV = process.env.ENV

function resolve(dir) {
  return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    Antd: 'ant-design-vue',
    vuex: 'Vuex',
    axios: 'axios',
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js',
  ],
}

// vue.config.js
const vueConfig = {
  // configureWebpack: {
  //   // webpack plugins
  //   plugins: [
  //     // Ignore all locale files of moment.js
  //     new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  //     new webpack.DefinePlugin({
  //       APP_VERSION: `"${require('./package.json').version}"`,
  //       BUILD_DATE: buildDate
  //     }),
  //     new CompressionWebpackPlugin({
  //       filename: '[path].gz[query]',
  //       algorithm: 'gzip',
  //       test: productionGzipExtensions,
  //       threshold: 100,
  //       minRatio: 0.8
  //     })
  //   ],
  //   // if prod, add externals
  //   // externals: isProd ? assetsCDN.externals : {}
  // },

  configureWebpack: config => {
    // webpack plugins
    // console.log("configureWebpack--->", config);
    config.plugins = [
      ...config.plugins,
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        BUILD_DATE: buildDate,
      }),
      // new CompressionWebpackPlugin({
      //   filename: '[path].gz[query]',
      //   algorithm: 'gzip',
      //   test: productionGzipExtensions,
      //   threshold: 100,
      //   minRatio: 0.8
      // })
    ]
    //灰度环境
    if (ENV !== 'production') {
      config.plugins = [...config.plugins]
      //替换nginx配置文件
      sh.replace({
        file: '/deploy/',
        newfile: '/deploy-uat/*',
      })
      //替换Dockerfile文件
      sh.replace({
        file: 'Dockerfile',
        newfile: 'Dockerfile.uat',
      })
    } else {
      //替换nginx配置文件
      sh.replace({
        file: '/deploy/',
        newfile: '/deploy-prod/*',
      })
      //替换Dockerfile文件
      sh.replace({
        file: 'Dockerfile',
        newfile: 'Dockerfile.build',
      })
    }
    // if prod, add externals
    // externals: isProd ? assetsCDN.externals : {}
  },

  chainWebpack: config => {
    // 移除prefetch插件，避免加载多余的资源
    config.plugins.delete('prefetch')
    // 压缩图片
    const imagesRule = config.module.rule('images')
    imagesRule.uses.clear()
    imagesRule
      .use('file-loader')
      .loader('url-loader')
      .options({
        limit: 10240,
        fallback: {
          loader: 'file-loader',
          options: {
            outputPath: 'static/images',
          },
        },
      })

    // 压缩响应的app.json返回的代码压缩
    config.optimization.minimize(true)

    config.resolve.alias
      .set('@$', resolve('src'))
      .set('assets', resolve('src/assets'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]',
      })

    // if prod is on
    // assets require on cdn
    // if (isProd) {
    //   config.plugin('html').tap(args => {
    //     args[0].cdn = assetsCDN
    //     return args
    //   })
    // }
  },

  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#4B7AFB',
            'layout-trigger-background': '#3A3F48',
            'menu-dark-submenu-bg': '#303e51',
            'layout-header-background': '#414751',
            'link-color': '#4B7AFB',
            'border-radius-base': '2px',
          },
          javascriptEnabled: true,
        },
      },
      postcss: {
        plugins: [
          require('autoprefixer')({
            overrideBrowserslist: [
              'ie >= 8', // 兼容IE7以上浏览器
              'Firefox >= 3.5', // 兼容火狐版本号大于3.5浏览器
              'chrome  >= 35', // 兼容谷歌版本号大于35浏览器,
              'opera >= 11.5', // 兼容欧朋版本号大于11.5浏览器,
              'chrome  >= 36', // 如果需要适配的浏览器完全兼容则不会添加前缀
            ],
          }),
        ],
      },
    },
  },

  devServer: {
    // development server port 8080
    port: 8080,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: {
      '/times-ec-erp': {
        target: process.env.VUE_APP_BASE_ERP_API,
        changeOrigin: true,
      },

      '/oss-backend/': {
        // target: 'https://times-uat-backend.oss-cn-shenzhen.aliyuncs.com',
        target: 'https://times-oss-dev.oss-cn-shenzhen.aliyuncs.com/',
        changeOrigin: true,
      },
      '/oss-frontend/': {
        // target: 'https://times-uat-backend.oss-cn-shenzhen.aliyuncs.com',
        target: 'https://times-oss-dev.oss-cn-shenzhen.aliyuncs.com/',
        changeOrigin: true,
      },
      '/times-ec-anchang': {
        // target: 'https://times-uat-backend.oss-cn-shenzhen.aliyuncs.com',
        target: process.env.VUE_APP_BASE_CASE_API, // "https://mall-uat-api-linli.timesgroup.cn:9526"
        changeOrigin: true,
        pathRewrite: {
          '^/times-ec-anchang': '/haha',
          //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
          //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
        },
      },
      '/api/areas': {
        // target: 'https://times-uat-backend.oss-cn-shenzhen.aliyuncs.com',
        target: process.env.VUE_APP_BASE_APPC_API,
        changeOrigin: true,
      },
      '/times/': {
        target:process.env.VUE_APP_BASE_CMS_WEBSITE,
        // target: 'http://m-center-dev.linli.timesgroup.cn:8000/', //dev
        // target: 'http://m-center-uat-linli.timesgroup.cn/', //uat
        // target: 'http://m-center-prod-linli.timesgroup.cn/',  //生产
        ws: true, //是否跨域
        changeOrigin: true,
      },
    },
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: false,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: [],
}

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
  console.log('VUE_APP_PREVIEW', true)
  // add `ThemeColorReplacer` plugin to webpack plugins
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig
