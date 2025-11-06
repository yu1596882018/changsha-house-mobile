<template>
  <div class="house-children">
    <!-- 导航栏 -->
    <van-nav-bar :title="$route.query.name" left-text="返回" left-arrow @click-left="onClickLeft" />

    <!-- 表头 -->
    <van-cell class="cell-head" title="楼栋名称" value="下证时间" />

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
            v-for="item in list"
            :key="item.id"
            :value="item.c"
            :label="`可售${item.l}、已售${item.k}`"
          >
            <template #title>
              <div class="col-title-block">
                {{ item.b }}
                <van-icon
                  size="2em"
                  name="eye-o"
                  @click="
                    toHouseChildrenInfo(
                      $route.query.id + '_' + item.i,
                      $route.query.name + ' ' + item.b
                    )
                  "
                />
              </div>
            </template>

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
 * 房源详情页面
 * @description 显示楼栋详细信息
 */
export default {
  name: 'HouseChildren',

  data() {
    return {
      // 列属性映射
      colAttrs: {
        j: '总户数',
        k: '已售',
        l: '可售',
        a: '预售许可证号',
        b: '对应栋号',
        c: '发证日期',
        d: '批准预售总面积(㎡)',
        e: '国土证号',
        f: '工程规划许可证号',
        g: '用地规划许可证号',
        h: '工程施工许可证',
        i: '楼栋每户信息表id',
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
    }
  },

  methods: {
    /**
     * 返回上一页
     */
    onClickLeft() {
      this.$router.back()
    },

    /**
     * 跳转到房源信息详情页
     * @param {string} id - 房源ID
     * @param {string} name - 房源名称
     */
    toHouseChildrenInfo(id, name) {
      this.$router.push({
        path: '/houseChildrenInfo',
        query: { id, name },
      })
    },

    /**
     * 加载数据
     */
    onLoad() {
      const houseId = this.$route.query.id

      this.$services
        .getHouseChildren(houseId, {
          offset: this.offset,
          limit: this.limit,
        })
        .then(res => {
          console.log('楼栋详情数据:', res.data)

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
          console.error('加载楼栋详情失败:', error)
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
.house-children {
  background-color: #f7f8fa;
  min-height: 100vh;
}

.cell-head {
  .van-cell__title {
    font-weight: bold;
  }

  .van-cell__value {
    font-weight: bold;
  }
}

.col-title-block {
  display: flex;
  align-items: center;

  .van-icon {
    margin-left: 6px;
    color: #1989fa;
    cursor: pointer;

    &:hover {
      color: #1677ff;
    }
  }
}
</style>
