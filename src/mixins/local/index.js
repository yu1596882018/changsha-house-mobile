/**
 * 局部混入
 * @description 提供局部混入功能，需要单独在组件中引入
 * 注意：为防止重名，混入代码统一用大写字母、下划线分割
 */

/**
 * 列表页面混入
 * @description 提供列表页面的通用功能
 */
export const listMixin = {
  data() {
    return {
      // 列表状态
      list: [],
      loading: false,
      finished: false,
      refreshing: false,

      // 分页参数
      offset: 0,
      limit: 20,
    }
  },

  methods: {
    /**
     * 加载数据
     */
    LOAD_DATA() {
      // 子组件需要实现此方法
      console.warn('请在子组件中实现 LOAD_DATA 方法')
    },

    /**
     * 下拉刷新
     */
    ON_REFRESH() {
      this.finished = false
      this.loading = true
      this.offset = 0
      this.LOAD_DATA()
    },

    /**
     * 处理数据加载结果
     * @param {Array} data - 数据数组
     * @param {number} total - 总数
     */
    HANDLE_LOAD_RESULT(data, total) {
      if (this.refreshing) {
        this.refreshing = false
      }

      if (this.offset <= 0) {
        this.list = data
      } else {
        this.list = this.list.concat(data)
      }

      this.loading = false
      this.offset += this.limit

      if (total < this.offset) {
        this.finished = true
      }
    },
  },
}

/**
 * 表单页面混入
 * @description 提供表单页面的通用功能
 */
export const formMixin = {
  data() {
    return {
      // 表单状态
      formData: {},
      formRules: {},
      submitting: false,
    }
  },

  methods: {
    /**
     * 表单提交
     * @param {object} values - 表单值
     */
    SUBMIT_FORM(values) {
      // 子组件需要实现此方法
      console.warn('请在子组件中实现 SUBMIT_FORM 方法')
    },

    /**
     * 表单验证
     * @returns {Promise}
     */
    VALIDATE_FORM() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve()
          } else {
            reject(new Error('表单验证失败'))
          }
        })
      })
    },

    /**
     * 重置表单
     */
    RESET_FORM() {
      this.$refs.form.resetFields()
    },
  },
}

/**
 * 详情页面混入
 * @description 提供详情页面的通用功能
 */
export const detailMixin = {
  data() {
    return {
      // 详情数据
      detailData: {},
      loading: false,
    }
  },

  methods: {
    /**
     * 加载详情数据
     * @param {string|number} id - 详情ID
     */
    LOAD_DETAIL(id) {
      // 子组件需要实现此方法
      console.warn('请在子组件中实现 LOAD_DETAIL 方法')
    },

    /**
     * 返回上一页
     */
    GO_BACK() {
      this.$router.back()
    },
  },
}

export default {
  listMixin,
  formMixin,
  detailMixin,
}
