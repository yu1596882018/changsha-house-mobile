/**
 * Babel配置
 * @description 配置Babel转换规则和插件
 */

module.exports = {
  // Vue CLI的预设配置，包含常用的Babel插件
  presets: ['@vue/cli-plugin-babel/preset'],

  // 插件配置
  plugins: [
    // babel-plugin-import：按需引入组件库
    // 用于Vant组件的按需加载，减小打包体积
    [
      'import',
      {
        libraryName: 'vant', // 组件库名称
        libraryDirectory: 'es', // 引入ES模块
        style: true, // 自动引入样式
      },
      'vant', // 插件名称
    ],
  ],
}
