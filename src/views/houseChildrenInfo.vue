<template>
  <div class="house-children-info">
    <!-- 导航栏 -->
    <van-nav-bar :title="$route.query.name" left-text="返回" left-arrow @click-left="onClickLeft" />

    <!-- 筛选菜单 -->
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
    </van-dropdown-menu>

    <!-- 下拉刷新和上拉加载 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        class="case-list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-collapse v-model="activeNames">
          <van-collapse-item
            :name="item.id"
            v-for="item in filterList"
            :title="item.a"
            :key="item.id"
            :value="item.i"
          >
            <van-cell v-for="key in Object.keys(colAttrs)" :key="key" :title="colAttrs[key]">
              {{ item[key] }}
            </van-cell>
          </van-collapse-item>
        </van-collapse>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
/**
 * 房源信息详情页面
 * @description 显示具体房源信息，支持筛选功能
 */
export default {
  name: 'HouseChildrenInfo',

  data() {
    return {
      // 列属性映射
      colAttrs: {
        a: '户室号',
        b: '楼层',
        c: '房屋用途',
        d: '房屋类型',
        e: '装修状态',
        f: '建筑面积',
        g: '套内面积',
        h: '分摊面积',
        i: '销售状态',
      },

      // 页面状态
      activeNames: [],
      list: [],
      loading: false,
      finished: false,
      refreshing: false,

      // 分页参数
      offset: 0,
      limit: 20,

      // 筛选参数
      value1: 0,
      option1: [
        { text: '全部', value: 0 },
        { text: '可售', value: 1 },
        { text: '已售', value: 2 },
      ],
    }
  },

  computed: {
    /**
     * 根据筛选条件过滤列表
     * @returns {Array}
     */
    filterList() {
      if (this.value1 === 1) {
        return this.list.filter(item => item.i === '可售')
      } else if (this.value1 === 2) {
        return this.list.filter(item => item.i === '已售')
      }
      return this.list
    },
  },

  methods: {
    /**
     * 返回上一页
     */
    onClickLeft() {
      this.$router.back()
    },

    /**
     * 加载数据
     */
    onLoad() {
      const houseId = this.$route.query.id

      this.$services
        .getHouseChildrenInfo(houseId, {
          offset: this.offset,
          limit: this.limit,
        })
        .then(res => {
          console.log('房源信息详情数据:', res.data)

          if (this.refreshing) {
            this.refreshing = false
          }

          // 处理数据
          if (this.offset <= 0) {
            this.list = res.data.rows
          } else {
            this.list = this.list.concat(res.data.rows)
          }

          this.loading = false
          this.offset += this.limit

          // 判断是否加载完成
          if (res.data.count < this.offset) {
            this.finished = true
          }
        })
        .catch(error => {
          console.error('加载房源信息详情失败:', error)
          this.loading = false
          this.$toast.fail('加载失败，请重试')
        })
    },

    /**
     * 下拉刷新
     */
    onRefresh() {
      this.finished = false
      this.loading = true
      this.offset = 0
      this.onLoad()
    },
  },
}
</script>

<style lang="scss" scoped>
.house-children-info {
  background-color: #f7f8fa;
  min-height: 100vh;
}
</style>
