/**
 * 服务层
 * @description 统一管理API接口调用
 */

/**
 * 服务类
 */
class Services {
  constructor(request) {
    this.request = request
  }

  /**
   * 获取房源信息列表
   * @param {object} params - 查询参数
   * @returns {Promise}
   */
  getHouseInfoList(params) {
    return this.request({
      url: '/houseInfoList',
      method: 'get',
      params,
    })
  }

  /**
   * 获取房源子信息
   * @param {string|number} tableId - 表格ID
   * @param {object} params - 查询参数
   * @returns {Promise}
   */
  getHouseChildren(tableId, params) {
    return this.request({
      url: `/houseChildren/${tableId}`,
      method: 'get',
      params,
    })
  }

  /**
   * 获取房源子信息详情
   * @param {string|number} tableId - 表格ID
   * @param {object} params - 查询参数
   * @returns {Promise}
   */
  getHouseChildrenInfo(tableId, params) {
    return this.request({
      url: `/houseChildrenInfo/${tableId}`,
      method: 'get',
      params,
    })
  }

  /**
   * 验证验证码
   * @param {object} data - 验证码数据
   * @returns {Promise}
   */
  verifyCode(data) {
    return this.request({
      url: '/verifyCode',
      method: 'post',
      data,
    }).then(res => res.data)
  }

  /**
   * 收藏房源信息
   * @param {string|number} id - 房源ID
   * @returns {Promise}
   */
  collectHouseInfo(id) {
    return this.request({
      url: '/collectHouseInfo',
      method: 'get',
      params: { id },
    }).then(res => res.data)
  }
}

/**
 * 服务插件
 */
export default {
  install(Vue) {
    Vue.prototype.$services = new Services(Vue.prototype.$request)
  },
}
