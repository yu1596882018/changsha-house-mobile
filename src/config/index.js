/**
 * 应用配置
 * @description 统一管理应用配置信息
 */

// 生产环境主机配置
const getProdHost = () => {
  const defaultHost = 'api.cshouses.top'

  // 特殊环境处理
  if (location.host === '39.108.161.237:8898') {
    return '39.108.161.237:8899'
  }

  return defaultHost
}

// 构建生产环境基础URL
const prodHost = getProdHost()
const prodBaseUrl = `${location.protocol}//${prodHost}`

// 导出请求基础URL
export const requestBaseUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8899' : prodBaseUrl
