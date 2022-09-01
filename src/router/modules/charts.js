/*
 * @Author: Hongzf
 * @Date: 2022-09-01 15:47:14
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-01 17:31:47
 * @Description:图表
 */
/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: '/charts/line/base-line',
  name: 'Charts',
  meta: {
    title: 'Charts图表',
    icon: 'chart',
    noCache: true
  },
  children: [
    // 折线图
    {
      path: 'line',
      component: () => import('@/views/charts/line/index'),
      name: 'Line',
      meta: { title: '折线图 line' }, // Line Chart
      redirect: '/charts/line/base-line',
      children: [
        // 基础折线图
        {
          path: 'base-line',
          component: () => import('@/views/charts/line/base-line'),
          name: 'BaseLine',
          meta: { title: '基础折线图' }
        },
        // 渐变折线图
        {
          path: 'line',
          component: () => import('@/views/charts/line/line'),
          name: 'Line',
          meta: { title: '渐变折线图', noCache: true }
        }
      ]
    },
    // 柱状图
    {
      path: 'bar',
      component: () => import('@/views/charts/bar/index'),
      name: 'Bar',
      meta: { title: '柱状图 bar' }, // Line Chart
      redirect: '/charts/bar/base-bar',
      children: [
        // 基础柱状图
        {
          path: 'base-bar',
          component: () => import('@/views/charts/bar/base-bar'),
          name: 'BaseLine',
          meta: { title: '基础柱状图' }
        },
        {
          path: 'base-bar',
          component: () => import('@/views/charts/bar/base-bar'),
          name: 'BaseLine',
          meta: { title: '基础柱状图2' }
        }
      ]
    },
    // 饼图
    {
      path: 'pie',
      component: () => import('@/views/charts/pie/index'),
      name: 'Pie',
      meta: { title: '饼图 pie' }, // Line Chart
      redirect: '/charts/pie/ring-pie',
      children: [
        // 基础柱状图
        {
          path: 'ring-pie',
          component: () => import('@/views/charts/pie/ring-pie'),
          name: 'RingPie',
          meta: { title: '圆环饼图' }
        },
        //
        {
          path: 'ring-pie',
          component: () => import('@/views/charts/pie/ring-pie'),
          name: 'RingPie',
          meta: { title: '圆环饼图2' }
        }
      ]
    },
    {
      path: 'keyboard',
      component: () => import('@/views/charts/keyboard'),
      name: 'KeyboardChart',
      meta: { title: 'Keyboard Chart', noCache: true }
    },
    {
      path: 'mix-chart',
      component: () => import('@/views/charts/mix-chart'),
      name: 'MixChart',
      meta: { title: '混合图', noCache: true }
    }
  ]
}

export default chartsRouter
