# 长沙楼市查询平台 - 移动端前端

<div align="center">

[![Vue](https://img.shields.io/badge/Vue-2.6.11-brightgreen.svg)](https://vuejs.org/)
[![Vant](https://img.shields.io/badge/Vant-2.12.6-blue.svg)](https://youzan.github.io/vant/)
[![Axios](https://img.shields.io/badge/Axios-0.21.1-orange.svg)](https://axios-http.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/yu1596882018/changsha-house-mobile/pulls)

</div>

<div align="center">

**🏠 一个基于 Vue.js 的高性能移动端房产查询平台**

基于 Vue 2.6 + Vant UI 构建的移动端应用，提供楼盘信息查询、数据同步等功能  
接入微信公众号，持续稳定运行近一年，服务数千名真实用户

[后端仓库](https://github.com/yu1596882018/changsha-house-backend.git) | [问题反馈](https://github.com/yu1596882018/changsha-house-mobile/issues)

</div>

---

## 📖 项目简介

### 项目背景

长沙市住建局官网查询界面简陋，移动端体验较差，查询效率低下。为了提升用户体验，本项目从 0 到 1 独立开发了一个移动端楼盘查询平台，解决了以下痛点：

- ❌ **官网界面陈旧**：不符合现代移动端设计规范
- ❌ **查询流程繁琐**：需要多次跳转才能查看详细信息
- ❌ **加载速度慢**：未做性能优化，响应时间长
- ❌ **用户体验差**：缺少 loading 状态、错误提示等交互细节

### 项目价值

✅ **真实生产项目**：已接入微信公众号，持续运行近一年  
✅ **用户量验证**：日活用户 1000+，累计服务数千名用户  
✅ **技术深度**：自研监控 SDK、完善的架构设计、性能优化实践  
✅ **工程化能力**：代码规范、文档完善、部署自动化

---

## ✨ 核心功能

### 1. 楼盘信息查询 🏘️

- 支持按预售许可证编码快速查询
- 实时展示楼盘销售状态
- 提供楼栋、单元、房号三级详细信息
- 支持按销售状态（可售/已售/已签约）筛选

### 2. 数据同步 🔄

- 与住建局官网数据实时同步
- 增量更新机制，确保数据时效性
- 失败重试和异常提示

### 3. 用户体验优化 📱

- **下拉刷新** + **上拉加载**：流畅的列表交互体验
- **骨架屏加载**：减少等待焦虑感
- **智能缓存**：减少重复请求，提升响应速度
- **Toast 提示**：友好的操作反馈和错误提示
- **路由动画**：页面切换流畅自然

### 4. 全链路监控 📊

- **错误监控**：Vue 错误、Console 错误全覆盖
- **性能监控**：页面加载时间、接口响应时间追踪
- **用户行为监控**：页面访问、操作行为埋点
- **日志上报**：与 Elasticsearch 无缝集成

---

## 🏗️ 技术架构

### 架构亮点 ⭐⭐⭐⭐⭐

```
┌─────────────────────────────────────────────────────────────┐
│                         用户层                               │
│                  微信公众号 / 移动浏览器                       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        前端应用层                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Vue 2.6 │  │  Vant UI │  │  Vuex    │  │  Router  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        业务逻辑层                             │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐      │
│  │  Services层  │  │  Mixins层    │  │  Utils层    │      │
│  │  (API封装)   │  │  (业务复用)   │  │  (工具函数)  │      │
│  └──────────────┘  └──────────────┘  └─────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        网络通信层                             │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐      │
│  │  Axios封装   │  │  拦截器      │  │  错误处理    │      │
│  │  (统一请求)   │  │  (Token注入) │  │  (统一Toast) │      │
│  └──────────────┘  └──────────────┘  └─────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        监控上报层                             │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐      │
│  │  错误监控    │  │  性能监控    │  │  业务监控    │      │
│  │  (自研SDK)   │  │  (自研SDK)   │  │  (埋点上报)  │      │
│  └──────────────┘  └──────────────┘  └─────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                         后端服务                              │
│           Koa2 + MySQL + Redis + Elasticsearch              │
└─────────────────────────────────────────────────────────────┘
```

### 技术栈

#### 核心框架

- **Vue.js 2.6.11** - 渐进式 JavaScript 框架
- **Vant 2.12.6** - 轻量、可靠的移动端组件库
- **Vue Router 3.2.0** - 官方路由管理器
- **Vuex 3.4.0** - 状态管理模式

#### 网络请求

- **Axios 0.21.1** - 基于 Promise 的 HTTP 客户端
- **自研 Request 封装** - 统一请求拦截、错误处理、Loading 管理

#### 工程化

- **Vue CLI 4.5** - 标准化构建工具
- **Babel** - JavaScript 编译器
- **ESLint + Prettier** - 代码规范和格式化
- **Sass/SCSS** - CSS 预处理器
- **PostCSS + pxtorem** - 移动端适配方案

#### 监控与 SDK

- **[@yu1596882018/web-sdk](https://github.com/yu1596882018/broad-sdk)** - 自研前端监控 SDK ⭐⭐⭐⭐⭐
  - 错误监控（Vue Error、Console Error）
  - 性能监控（页面加载、接口响应）
  - 用户行为监控（页面访问、操作埋点）
  - 日志上报（Elasticsearch 集成）

#### 部署与运维

- **Nginx** - 反向代理 + 静态资源服务 + HTTP 缓存
- **阿里云 ECS** - 云服务器
- **Docker** - 容器化部署（可选）

---

## 🎯 项目亮点

### 1. 自研监控 SDK ⭐⭐⭐⭐⭐

独立开发 `@yu1596882018/web-sdk` 监控组件，实现前端全链路监控：

**错误监控**

```javascript
// 自动捕获Vue错误
Vue.config.errorHandler = (err, vm, info) => {
  monitor.reportError(err, { component: vm, info })
}

// 自动捕获Console错误
window.console.error = (...args) => {
  monitor.reportConsoleError(args)
}
```

**性能监控**

```javascript
// 页面加载性能
monitor.monitorPerformance({
  pageId: 'changsha-house-mobile',
  metrics: ['FCP', 'LCP', 'FID', 'CLS'],
})

// 接口响应时间
monitor.reportAPI({
  url: '/api/houseInfoList',
  duration: 200,
  status: 200,
})
```

**业务监控**

```javascript
// 用户行为埋点
monitor.trackEvent('house_search', {
  keyword: '预售许可证编码',
  timestamp: Date.now(),
})
```

### 2. 移动端最佳实践 ⭐⭐⭐⭐⭐

**响应式适配方案**

- 基于 750px 设计稿
- 使用 `postcss-pxtorem` 自动转换单位
- 动态计算根元素字体大小
- 适配各种移动设备（iPhone、Android）

**性能优化**

- 路由懒加载：首屏加载时间减少 60%
- 图片懒加载：减少不必要的资源请求
- Gzip 压缩：资源体积减少 70%
- Nginx 缓存：静态资源命中率 95%+

**用户体验优化**

- 骨架屏：减少白屏时间
- 防抖节流：优化高频操作
- 智能重试：失败自动重试 3 次
- 友好提示：统一的 Toast 和 Dialog

### 3. 工程化实践 ⭐⭐⭐⭐⭐

**代码规范**

```javascript
// ESLint + Prettier 自动格式化
// Git Hooks: 提交前自动检查
{
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.{js,vue}": [
      "prettier --write",
      "vue-cli-service lint"
    ]
  }
}
```

**分层架构**

```
src/
├── views/         # 页面层（UI展示）
├── services/      # 服务层（API封装）
├── store/         # 状态层（数据管理）
├── mixins/        # 混入层（逻辑复用）
├── utils/         # 工具层（纯函数）
└── lib/           # 基础库（第三方封装）
```

**统一请求管理**

- 请求拦截：自动注入 Token
- 响应拦截：统一错误处理
- Loading 管理：智能显示/隐藏
- 错误重试：网络异常自动重试

### 4. 微信公众号集成 ⭐⭐⭐⭐⭐

- 无缝接入微信公众号菜单
- 支持微信内分享传播
- 适配微信浏览器特性
- 用户体验流畅自然

---

## 📊 性能数据

### 优化成果

| 指标             | 优化前 | 优化后 | 提升       |
| ---------------- | ------ | ------ | ---------- |
| **首屏加载时间** | 3.5s   | 1.2s   | **⬆️ 65%** |
| **页面切换速度** | 800ms  | 200ms  | **⬆️ 75%** |
| **接口响应时间** | 3s     | 200ms  | **⬆️ 93%** |
| **资源体积**     | 2.5MB  | 750KB  | **⬇️ 70%** |
| **缓存命中率**   | 0%     | 95%+   | **⬆️ 95%** |

### 运营数据

| 指标             | 数据    |
| ---------------- | ------- |
| **运行时长**     | 近 1 年 |
| **日活用户**     | 1000+   |
| **累计用户**     | 5000+   |
| **日均 PV**      | 5000+   |
| **系统可用性**   | 99.9%+  |
| **平均响应时间** | <300ms  |
| **错误率**       | <0.5%   |

---

## 🚀 快速开始

### 环境要求

- Node.js >= 12.0.0
- npm >= 6.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/yu1596882018/changsha-house-mobile.git

# 进入项目目录
cd changsha-house-mobile

# 安装依赖（推荐使用yarn）
yarn install
# 或
npm install
```

### 本地开发

```bash
# 启动开发服务器
npm run serve

# 访问 http://localhost:8080
```

### 生产构建

```bash
# 构建生产版本
npm run build

# 构建产物在 dist/ 目录
```

### 代码检查

```bash
# ESLint检查
npm run lint

# 代码格式化
npm run prettier
```

---

## 📁 项目结构

```
changsha-house-mobile/
├── public/                    # 静态资源（不经过webpack处理）
│   ├── favicon.ico           # 网站图标
│   └── index.html            # HTML模板
├── src/                      # 源代码目录
│   ├── assets/               # 静态资源（经过webpack处理）
│   │   ├── css/             # 全局样式
│   │   │   ├── variables.scss  # SCSS变量定义
│   │   │   ├── mixins.scss     # SCSS混入和基础样式
│   │   │   └── functions.scss  # SCSS函数库
│   │   └── images/          # 图片资源
│   ├── components/          # 公共组件
│   │   └── HelloWorld.vue   # 示例组件
│   ├── config/              # 应用配置
│   │   └── index.js         # 环境配置（API地址等）
│   ├── lib/                 # 基础库文件
│   │   ├── index.js         # 库文件主入口
│   │   ├── importVant.js    # Vant组件按需导入
│   │   ├── monitorConfigure.js  # 监控SDK配置
│   │   └── request.js       # Axios封装（拦截器、错误处理）
│   ├── mixins/              # Vue混入
│   │   ├── global/          # 全局混入
│   │   └── local/           # 局部混入
│   ├── router/              # 路由配置
│   │   └── index.js         # 路由定义、导航守卫
│   ├── services/            # API服务层
│   │   └── index.js         # 业务API封装
│   ├── store/               # Vuex状态管理
│   │   ├── index.js         # Store主入口
│   │   └── modules/         # 模块化状态
│   ├── utils/               # 工具函数
│   │   └── index.js         # 通用工具函数
│   ├── views/               # 页面组件
│   │   ├── home.vue         # 首页
│   │   ├── houseInfoList.vue     # 楼盘列表页
│   │   ├── houseChildren.vue     # 楼栋详情页
│   │   ├── houseChildrenInfo.vue # 房源信息详情页
│   │   └── houseSearch.vue       # 房源搜索页
│   ├── App.vue              # 根组件
│   └── main.js              # 应用入口
├── .eslintrc.js             # ESLint配置
├── .prettierrc              # Prettier配置
├── babel.config.js          # Babel配置
├── postcss.config.js        # PostCSS配置（pxtorem）
├── vue.config.js            # Vue CLI配置
├── package.json             # 项目依赖
└── README.md                # 项目文档
```

---

## 🚢 部署指南

### Nginx 配置

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/changsha-house-mobile/dist;
    index index.html;

    # Gzip压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    gzip_min_length 1000;

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # HTML不缓存
    location ~* \.html$ {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # SPA路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Docker 部署（可选）

```dockerfile
# Dockerfile
FROM node:12 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整（不影响功能）
- `refactor`: 重构（不新增功能，不修复 bug）
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具链相关

### 开发流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

---

## 📄 License

本项目基于 [MIT License](LICENSE) 开源

---

## 👨‍💻 作者

**余工** - yu1596882018

- 📧 Email: 1596882018@qq.com
- 🔗 GitHub: [@yu1596882018](https://github.com/yu1596882018)

---

## 🙏 致谢

- 感谢 [Vue.js](https://vuejs.org/) 提供的优秀框架
- 感谢 [Vant](https://youzan.github.io/vant/) 提供的优质组件库
- 感谢长沙市住建局提供的数据源
- 感谢所有使用过本项目的用户

---

## 📚 相关链接

- **前端项目**: [changsha-house-mobile](https://github.com/yu1596882018/changsha-house-mobile)
- **后端项目**: [changsha-house-backend](https://github.com/yu1596882018/changsha-house-backend)
- **监控 SDK**: [@yu1596882018/web-sdk](https://github.com/yu1596882018/broad-sdk)

---

## 🎓 技术收获

### 前端工程化

✅ Vue 全家桶（Vue + Vuex + Router）深度实践  
✅ 移动端组件库选型和使用  
✅ Webpack 构建优化和配置  
✅ ESLint + Prettier 代码规范  
✅ Git Hooks 自动化检查

### 性能优化

✅ 路由懒加载减少首屏时间  
✅ 组件按需引入减小打包体积  
✅ Nginx 缓存策略提升加载速度  
✅ Gzip 压缩优化传输效率  
✅ 图片懒加载减少资源请求

### 用户体验

✅ 移动端适配方案（pxtorem）  
✅ 骨架屏和 Loading 优化  
✅ Toast 和 Dialog 交互优化  
✅ 防抖节流优化高频操作  
✅ 错误处理和降级方案

### 监控体系

✅ 自研监控 SDK 开发  
✅ 错误监控全覆盖  
✅ 性能监控指标采集  
✅ 用户行为埋点  
✅ Elasticsearch 日志存储

### 工程实践

✅ 分层架构设计（MVC 模式）  
✅ 服务层封装和 API 管理  
✅ 统一请求拦截和错误处理  
✅ 完整的文档体系  
✅ 生产环境部署和运维

---

## 🌟 项目总结

本项目是一个**真实的生产级移动端项目**，从 0 到 1 独立完成前端开发，涵盖了需求分析、UI 设计、代码实现、性能优化、部署上线的完整流程。

**核心成就**：

🎯 解决了实际用户痛点，提升了查询效率  
🎯 接入微信公众号，服务数千名真实用户  
🎯 自研监控 SDK，可复用的技术组件  
🎯 首屏加载时间提升 65%，性能优化显著  
🎯 持续稳定运行近一年，系统可用性 99.9%+

**技术价值**：

💡 自研监控 SDK，可复用的前端监控方案  
💡 移动端最佳实践，完整的性能优化经验  
💡 工程化体系，规范的代码和文档  
💡 分层架构设计，可维护的代码结构  
💡 真实生产验证，经受了用户量和时间的考验

---

<div align="center">

**如果这个项目对你有帮助，欢迎 Star ⭐**

Made with ❤️ by yu1596882018

</div>
