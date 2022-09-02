/*
 * @Author: Hongzf
 * @Date: 2022-08-02 10:19:50
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-02 10:19:46
 * @Description: 员工管理-任务分配
 */

import request from '@/utils/request'
const prefix = process.env.VUE_APP_WL_ERM_PREFIX
// console.log('【 prefix==== 】-11', prefix)
// 列表
export function queryTaskInfoPage(data) {
  return request({
    url: prefix + '/taskInfo/queryTaskInfoPage',
    method: 'post',
    data
  })
}
// 弹框-列表
export function queryStandardFullDetailByTaskType(data) {
  return request({
    url: prefix + '/taskInfo/queryStandardFullDetailByTaskType',
    method: 'post',
    data
  })
}

// 获取详情
export function getTaskInfoDetail(data) {
  return request({
    url: prefix + '/taskInfo/getTaskInfoDetail',
    method: 'post',
    data
  })
}

// 新增
export function saveTaskInfo(data) {
  return request({
    url: prefix + '/taskInfo/saveTaskInfo',
    method: 'post',
    data
  })
}

// 修改
export function updateTaskInfo(data) {
  return request({
    url: prefix + '/taskInfo/updateTaskInfo',
    method: 'post',
    data
  })
}

// 删除
export function deleteTaskInfo(data) {
  return request({
    url: prefix + '/taskInfo/deleteTaskInfo',
    method: 'post',
    data
  })
}
// 根据任务类型查询全部必须的完整规范细则
export function queryNeedStandardFullDetailByTaskType(data) {
  return request({
    url: prefix + '/taskInfo/queryNeedStandardFullDetailByTaskType',
    method: 'post',
    data
  })
}

// 根据任务类型分页查询非必须的完整规范细则
export function queryNotNeedStandardFullDetailByTaskType(data) {
  return request({
    url: prefix + '/taskInfo/queryNotNeedStandardFullDetailByTaskType',
    method: 'post',
    data
  })
}

