/**
 * HTTP请求库
 * @description 基于axios的HTTP请求封装，提供统一的请求接口和错误处理
 */

import axios from 'axios'
import { requestBaseUrl } from '@/config'
import loadingManage from '@yu1596882018/web-sdk/es/lib/loadingManage'

// 配置axios默认设置
axios.defaults.baseURL = requestBaseUrl

/**
 * 请求库插件
 */
export default {
  install(Vue) {
    let loadingInstance = null

    /**
     * 显示加载提示
     */
    const showLoading = () => {
      if (!loadingInstance) {
        loadingInstance = Vue.prototype.$toast.loading({
          duration: 0,
          forbidClick: true,
          message: '加载中...',
        })
      }
    }

    /**
     * 隐藏加载提示
     */
    const hideLoading = () => {
      if (loadingInstance) {
        loadingInstance.clear()
        loadingInstance = null
      }
    }

    /**
     * 全局请求方法
     * @param {object} options - 请求配置
     * @returns {Promise}
     */
    Vue.prototype.$request = function (options) {
      const context = this
      const requestArguments = arguments

      // 创建加载管理器
      const requestEnd = loadingManage({
        ...(options && typeof options === 'object' ? options : {}),
        showLoading,
        hideLoading,
      })

      return new Promise((resolve, reject) => {
        axios
          .apply(this, requestArguments)
          .then((...args) => {
            resolve.apply(context, args)
            requestEnd()
          })
          .catch((...args) => {
            // 统一错误处理
            handleRequestError(args[0], context)
            reject.apply(context, args)
            requestEnd()
          })
      })
    }

    /**
     * 处理请求错误
     * @param {Error} error - 错误对象
     * @param {Vue} context - Vue实例上下文
     */
    const handleRequestError = (error, context) => {
      const response = error.response

      // 401未授权处理
      if (response && response.status === 401) {
        // 跳转到登录页面
        context.$router && context.$router.push('/login')
        return
      }

      // 其他错误状态码处理
      if (response && response.status !== 200) {
        handleResponseError(response)
        return
      }

      // 网络错误处理
      Vue.prototype.$toast.fail('网络繁忙，请稍后重试')
    }

    /**
     * 处理响应错误
     * @param {object} response - 响应对象
     */
    const handleResponseError = response => {
      const { data, status } = response

      // 字符串类型错误
      if (typeof data === 'string') {
        Vue.prototype.$toast.fail(data)
        return
      }

      // 对象类型错误
      if (typeof data === 'object' && data !== null) {
        Object.keys(data).forEach(key => {
          const value = data[key]

          if (typeof value === 'string') {
            Vue.prototype.$toast.fail(`${key}: ${value}`)
          } else if (Array.isArray(value)) {
            value.forEach(item => {
              Vue.prototype.$toast.fail(`${key}: ${item}`)
            })
          }
        })
      }
    }

    // 请求拦截器
    axios.interceptors.request.use(
      config => {
        // 添加认证token
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `JWT ${token}`
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    axios.interceptors.response.use(
      response => {
        return response
      },
      error => {
        // 网络错误统一处理
        Vue.prototype.$toast.fail('网络繁忙，请稍后重试')
        return Promise.reject(error)
      }
    )
  },
}
