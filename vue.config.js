/**
 * Vue CLI配置
 * @description 自定义Vue CLI的webpack配置
 * @see https://cli.vuejs.org/zh/config/
 */

const path = require('path')

module.exports = {
  /**
   * 公共路径
   * 部署在子路径时需要修改（如：'/app/'）
   */
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

  /**
   * 输出目录
   * 构建产物输出的目录
   */
  outputDir: 'dist',

  /**
   * 静态资源目录
   * 放置生成的静态资源（js、css、img、fonts）的目录
   */
  assetsDir: 'static',

  /**
   * 开发环境下是否进行lint检查
   */
  lintOnSave: process.env.NODE_ENV !== 'production',

  /**
   * 生产环境是否生成sourceMap
   * 设置为false可以加速生产环境构建
   */
  productionSourceMap: false,

  /**
   * 开发服务器配置
   */
  devServer: {
    port: 8080, // 开发服务器端口
    open: true, // 自动打开浏览器
    overlay: {
      // 错误覆盖层
      warnings: false,
      errors: true,
    },
    // 代理配置（如需要）
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8899',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },

  /**
   * CSS相关配置
   */
  css: {
    // 是否将组件中的CSS提取至一个独立的CSS文件中
    extract: process.env.NODE_ENV === 'production',

    // 是否开启CSS source map
    sourceMap: false,
  },

  /**
   * 插件配置
   */
  pluginOptions: {
    // 全局SCSS变量和函数注入
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        // 自动注入SCSS变量和函数到所有组件
        path.resolve(__dirname, './src/assets/css/variables.scss'),
        path.resolve(__dirname, './src/assets/css/functions.scss'),
      ],
    },
  },

  /**
   * webpack链式配置
   * 用于更细粒度的webpack配置调整
   */
  chainWebpack: config => {
    // 设置别名
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('@assets', path.resolve(__dirname, 'src/assets'))
      .set('@components', path.resolve(__dirname, 'src/components'))
      .set('@views', path.resolve(__dirname, 'src/views'))
      .set('@utils', path.resolve(__dirname, 'src/utils'))

    // SVG处理（如果需要）
    // config.module
    //   .rule('svg')
    //   .exclude.add(path.resolve(__dirname, 'src/icons'))
    //   .end()
  },

  /**
   * webpack直接配置
   * 用于合并到最终的webpack配置
   */
  // configureWebpack: {
  //   optimization: {
  //     splitChunks: {
  //       chunks: 'all',
  //       cacheGroups: {
  //         // 第三方库单独打包
  //         vendor: {
  //           test: /[\\/]node_modules[\\/]/,
  //           name: 'vendors',
  //           priority: 10
  //         },
  //         // Vue全家桶单独打包
  //         vue: {
  //           test: /[\\/]node_modules[\\/](vue|vue-router|vuex)[\\/]/,
  //           name: 'vue',
  //           priority: 20
  //         }
  //       }
  //     }
  //   }
  // }
}
