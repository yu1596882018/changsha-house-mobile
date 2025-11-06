/**
 * 工具函数库
 * @description 提供常用的工具函数
 */

/**
 * 格式化日期
 * @param {Date|string} date - 日期
 * @param {string} format - 格式
 * @returns {string}
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
  if (!date) return ''

  const d = new Date(date)
  if (isNaN(d.getTime())) return ''

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 格式化金额
 * @param {number} amount - 金额
 * @param {string} currency - 货币符号
 * @returns {string}
 */
export function formatMoney(amount, currency = '¥') {
  if (isNaN(amount)) return `${currency}0.00`
  return `${currency}${Number(amount).toFixed(2)}`
}

/**
 * 格式化手机号（脱敏）
 * @param {string} phone - 手机号
 * @returns {string}
 */
export function formatPhone(phone) {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length !== 11) return phone
  return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')
}

/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间(ms)
 * @returns {Function}
 */
export function debounce(func, wait = 300) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * 节流函数
 * @param {Function} func - 要节流的函数
 * @param {number} limit - 限制时间(ms)
 * @returns {Function}
 */
export function throttle(func, limit = 300) {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * 深拷贝
 * @param {*} obj - 要拷贝的对象
 * @returns {*}
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  if (typeof obj === 'object') {
    const clonedObj = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
}

/**
 * 生成唯一ID
 * @returns {string}
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

/**
 * 检查是否为移动设备
 * @returns {boolean}
 */
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

/**
 * 检查网络状态
 * @returns {boolean}
 */
export function checkNetworkStatus() {
  return navigator.onLine
}

/**
 * 复制到剪贴板
 * @param {string} text - 要复制的文本
 * @returns {Promise<boolean>}
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // 降级方案
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    }
  } catch (error) {
    console.error('Copy failed:', error)
    return false
  }
}

/**
 * 获取URL参数
 * @param {string} url - URL地址
 * @returns {object}
 */
export function getUrlParams(url = window.location.href) {
  const urlObj = new URL(url)
  const params = {}
  for (const [key, value] of urlObj.searchParams) {
    params[key] = value
  }
  return params
}

/**
 * 设置URL参数
 * @param {object} params - 参数对象
 * @param {string} url - URL地址
 * @returns {string}
 */
export function setUrlParams(params, url = window.location.href) {
  const urlObj = new URL(url)
  Object.keys(params).forEach(key => {
    urlObj.searchParams.set(key, params[key])
  })
  return urlObj.toString()
}

/**
 * 验证工具
 */
export const validate = {
  // 验证手机号
  isPhone(phone) {
    return /^1[3-9]\d{9}$/.test(phone)
  },

  // 验证邮箱
  isEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  },

  // 验证身份证号
  isIdCard(idCard) {
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard)
  },

  // 验证URL
  isUrl(url) {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },

  // 验证是否为空
  isEmpty(value) {
    return value === null || value === undefined || value === ''
  },

  // 验证是否为数字
  isNumber(value) {
    return typeof value === 'number' && !isNaN(value)
  },

  // 验证是否为整数
  isInteger(value) {
    return Number.isInteger(value)
  },

  // 验证是否为数组
  isArray(value) {
    return Array.isArray(value)
  },

  // 验证是否为对象
  isObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
  },

  // 验证是否为函数
  isFunction(value) {
    return typeof value === 'function'
  },

  // 验证是否为字符串
  isString(value) {
    return typeof value === 'string'
  },

  // 验证是否为布尔值
  isBoolean(value) {
    return typeof value === 'boolean'
  },
}

/**
 * 设备工具
 */
export const device = {
  // 检测是否为移动设备
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  },

  // 检测是否为iOS
  isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent)
  },

  // 检测是否为Android
  isAndroid() {
    return /Android/.test(navigator.userAgent)
  },

  // 检测是否为微信浏览器
  isWechat() {
    return /MicroMessenger/i.test(navigator.userAgent)
  },

  // 获取设备像素比
  getPixelRatio() {
    return window.devicePixelRatio || 1
  },

  // 获取屏幕尺寸
  getScreenSize() {
    return {
      width: window.screen.width,
      height: window.screen.height,
    }
  },

  // 获取视口尺寸
  getViewportSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  },

  // 获取设备信息
  getDeviceInfo() {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      pixelRatio: this.getPixelRatio(),
      screenSize: this.getScreenSize(),
      viewportSize: this.getViewportSize(),
    }
  },
}

export default {
  formatDate,
  formatMoney,
  formatPhone,
  debounce,
  throttle,
  deepClone,
  generateId,
  isMobile,
  checkNetworkStatus,
  copyToClipboard,
  getUrlParams,
  setUrlParams,
  validate,
  device,
}
