/**
 * 监控配置
 * @description 配置错误监控和性能监控
 */

import Vue from 'vue'
import { MonitorJS } from '@yu1596882018/web-sdk/es/lib/monitor'
import { requestBaseUrl } from '@/config'

// 创建监控实例
const monitor = new MonitorJS()

// 监控配置
const monitorConfig = {
  url: `${requestBaseUrl}/reportMonitor`, // 错误上报地址
  consoleError: true, // 是否记录console.error错误信息
  vueError: true, // 是否记录vue错误信息
  vue: Vue, // Vue实例，用于监控vue错误信息
}

// 性能监控配置
const performanceConfig = {
  pageId: 'changsha-house-mobile', // 页面唯一标识
  url: `${requestBaseUrl}/reportMonitor`, // 信息采集上报地址
}

// 初始化监控
monitor.init(monitorConfig)

// 启动性能监控
monitor.monitorPerformance(performanceConfig)
