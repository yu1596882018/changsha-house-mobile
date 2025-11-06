/**
 * 应用主入口
 * @description 初始化Vue应用
 */

import Vue from 'vue'

// 导入库文件
import '@/lib'

// 导入应用组件
import App from './App.vue'

// 导入路由和状态管理
import router from './router'
import store from './store'

// 导入服务层和混入
import services from './services'
import mixins from './mixins/global'

// 注册服务插件
Vue.use(services)

// 注册全局混入
Vue.mixin(mixins)

// 关闭生产环境提示
Vue.config.productionTip = false

/**
 * 创建Vue实例
 */
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
