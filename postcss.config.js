/**
 * PostCSS配置
 * @description 配置CSS后处理器，实现移动端适配和浏览器兼容
 */

module.exports = ({ file }) => {
  // 判断是否为Vant组件库的样式文件
  // Vant使用37.5为基准，其他使用75（基于750px设计稿）
  let isVant = file && file.dirname && file.dirname.indexOf('vant') > -1
  let rootValue = isVant ? 37.5 : 75

  return {
    plugins: {
      /**
       * postcss-pxtorem
       * 自动将px转换为rem，实现移动端适配
       *
       * 设计稿宽度：750px
       * rootValue：75 (750 / 10)
       * 1rem = 75px (设计稿上)
       * 实际展示：1rem = (屏幕宽度 / 10)
       */
      'postcss-pxtorem': {
        rootValue: rootValue, // 根元素字体大小
        unitPrecision: 2, // 保留小数点位数
        minPixelValue: 2, // 小于2px不转换
        propList: ['*'], // 所有属性都转换
      },

      /**
       * autoprefixer
       * 自动添加浏览器前缀，提升兼容性
       */
      autoprefixer: {},

      /**
       * postcss-preset-env
       * 使用最新的CSS特性，自动polyfill
       */
      'postcss-preset-env': {},
    },
  }
}
