<template>
  <div class="house-search">
    <!-- 导航栏 -->
    <van-nav-bar :title="pageTitle" left-text="返回" left-arrow @click-left="onClickLeft" />

    <!-- 搜索表单 -->
    <van-form ref="searchForm" @submit="onSubmit">
      <van-field
        v-model="username"
        name="yszh"
        label="预售许可证"
        placeholder="请填写预售许可证"
        :rules="[{ required: true, message: '请填写预售许可证' }]"
      />
      <van-field
        v-model="verifyCode"
        name="verify_code"
        label="验证码"
        placeholder="请填写验证码"
        autocomplete="off"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #button>
          <img class="code-img" :src="codeImgUrl" @click="switchCodeImg" alt="验证码" />
        </template>
      </van-field>
    </van-form>

    <!-- 搜索按钮 -->
    <div class="search-buttons">
      <van-button round block type="info" @click="search2">
        同步"长沙市住房和城乡建设局"公示数据
      </van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { requestBaseUrl } from '@/config'

/**
 * 房源搜索页面
 * @description 根据预售许可证编码搜索楼盘信息
 */
export default {
  name: 'HouseSearch',

  data() {
    return {
      // 表单数据
      username: this.$route.query.code || '',
      verifyCode: '',
      codeImgUrl: `${requestBaseUrl}/getCodeImg`,

      // 提交类型
      submitType: 0,
    }
  },

  computed: {
    /**
     * 页面标题
     * @returns {string}
     */
    pageTitle() {
      return this.$route.query.code ? '楼盘数据更新' : '根据预售许可证编码搜索楼盘'
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
     * 表单提交处理
     * @param {object} values - 表单值
     */
    onSubmit(values) {
      if (this.submitType === 1) {
        this.submitMethod1(values)
      } else if (this.submitType === 2) {
        this.submitMethod2(values)
      }
    },

    /**
     * 方法1：在已有数据中查询
     * @param {object} values - 表单值
     */
    submitMethod1(values) {
      this.$services
        .verifyCode(values)
        .then(res => {
          console.log('验证码验证结果:', res)

          if (res && res.status !== '1') {
            Toast.fail('验证码错误')
            this.switchCodeImg()
            return
          }

          // 查询已有数据
          this.$services
            .getHouseInfoList({ v: res.id })
            .then(res2 => {
              console.log('查询结果:', res2)

              const tempDom = document.createElement('div')
              tempDom.innerHTML = res.content
              const name = tempDom.querySelectorAll('a')?.[0]?.innerHTML

              if (res2.data.count) {
                this.$router.push({
                  path: '/houseChildren',
                  query: { id: res.id, name },
                })
              } else {
                Toast.fail('在已有数据中，没有该楼盘信息，试试爬取网络数据查询吧')
              }
            })
            .catch(error => {
              console.error('查询失败:', error)
              Toast.fail('查询失败，请重试')
            })
        })
        .catch(error => {
          console.error('验证码验证失败:', error)
          Toast.fail('验证码验证失败')
          this.switchCodeImg()
        })
    },

    /**
     * 方法2：同步网络数据
     * @param {object} values - 表单值
     */
    submitMethod2(values) {
      this.$services
        .verifyCode(values)
        .then(res => {
          console.log('验证码验证结果:', res)

          if (res && res.status !== '1') {
            Toast.fail('验证码错误')
            this.switchCodeImg()
            return
          }

          Toast({
            message: '请耐心等待，这个时间会比较长噢~',
            position: 'bottom',
            duration: 3000,
          })

          // 同步网络数据
          this.$services
            .collectHouseInfo(res.id)
            .then(res2 => {
              console.log('同步结果:', res2)

              const tempDom = document.createElement('div')
              tempDom.innerHTML = res.content
              const name = tempDom.querySelectorAll('a')?.[0]?.innerHTML

              if (res2 === 'success') {
                this.$router.push({
                  path: '/houseChildren',
                  query: { id: res.id, name },
                })
              } else {
                Toast.fail('查询失败，请稍后再试噢~')
              }
            })
            .catch(error => {
              console.error('同步失败:', error)
              Toast.fail('同步失败，请稍后再试')
            })
        })
        .catch(error => {
          console.error('验证码验证失败:', error)
          Toast.fail('验证码验证失败')
          this.switchCodeImg()
        })
    },

    /**
     * 搜索方法1（已注释）
     */
    search1() {
      this.submitType = 1
      this.$refs.searchForm.submit()
    },

    /**
     * 搜索方法2：同步网络数据
     */
    search2() {
      this.submitType = 2
      this.$refs.searchForm.submit()
    },

    /**
     * 切换验证码图片
     */
    switchCodeImg() {
      this.codeImgUrl = `${requestBaseUrl}/getCodeImg?v${Math.random()}`
    },
  },
}
</script>

<style lang="scss" scoped>
.house-search {
  background-color: #f7f8fa;
  min-height: 100vh;
  padding: 16px;
}

.search-buttons {
  margin-top: 16px;
}

.code-img {
  width: 70px * 1.5;
  height: 28px * 1.5;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
}
</style>
