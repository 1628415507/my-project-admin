/*
 * @Author: Hongzf
 * @Date: 2022-07-22 16:25:46
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-01 09:52:18
 * @Description: 字典
 */
// 用户类型
export const USER_TYPE = {
  DISPATCHER: 'dispatcher', // 本人
  STAFF: 'executor', // 员工1
  ORDINATOR: 'ordinator', // 统筹人2
  CHARGE: 'leader', // 负责人3
  PROJECT_MANAGER: 'auditor', // 项目经理4
  DEPT_LEADER: 'approver' // 部门领导2
  // DEPT_LEADER_APPROVER: 'approver', // 部门领导_转正
  // DEPT_LEADER_AUDITOR: 'auditor' // 部门领导_离职
}

// 禁用启用
export const VALID_STATUS = {
  '': '所有',
  'false': '禁用',
  'true': '启用'
}
// 任务分配-任务状态
export const TASK_STATUS = {
  '0': '待完成',
  '1': '执行中',
  '2': '已完成'
}

// 性别
export const SEX = {
  false: '男',
  true: '女'
}
// 转正类型
export const OFFER_TYPE = {
  '0': '正常转正',
  '1': '提前转正'
}
// 在职状态 （0：试用员工 1：正式员工 2：离职员工）
export const JOB_STATUS = {
  '0': '试用员工',
  '1': '正式员工',
  '2': '离职员工'
}
// 婚姻状况（0：未婚 1：已婚 2：离婚）
export const MARITAL_STATUS = {
  '0': '未婚',
  '1': '已婚',
  '2': '离婚'
}
export const POLITICAL_STATUS = {
  '1': '群众',
  '2': '党员',
  '3': '无党派人士',
  '4': '共青团员',
  '5': '预备党员'
}
// 学历（0：专科 1：本科 2：研究生 3：博士生）
export const EDUCATION = {
  '0': '专科',
  '1': '本科',
  '2': '研究生',
  '3': '博士生'
}
// 任务类型
export const TASK_TYPE = {
  'TASK_TRAIL': '试用任务',
  'TASK_STUDY': '学习任务',
  'TASK_TRAIN': '培训任务',
  'TASK_OTHER': '其他任务'
}

// 我的任务-任务状态
export const MY_TASK_STATUS = {
  '0': '待完成',
  '1': '进行中',
  '2': '已完成',
  '3': '审批中'
}
// 完成结果
export const COMPLETE_RESULT = {
  '0': '优秀',
  '1': '良好',
  '2': '一般'
}
// 我的任务-完成情况
export const COMPLETION = {
  '0': '待完成',
  // '1': '执行中',
  '2': '已完成',
  '3': '退回重做'
}
// 我的任务-完成情况
export const COMPLETION_EN = {
  COMPLETED: '已完成',
  TODO: '待完成',
  REDO: '退回重做'
}
// 拟同意类型
export const INCLINED_AGREE_TYPE = {
  '0': '拟不同意',
  '1': '拟同意'
}
export const AGREE_TYPE = {
  '0': '不同意',
  '1': '同意'
}
// 任务状态
// export const TASK_STATUS = {
//   '100': '未开始',
//   '110': '进行中',
//   '130': '成功',
//   '80': '失败',
//   '90': '取消'
// }
// 任务类型
// export const TASK_TYPE = {
//   custom: '自定义',
//   schedule: '定时',
//   error: '错误'
// }
export const DS_FORMAT = {
  'yyyyMMdd': 'yyyyMMdd',
  'yyyyMM': 'yyyyMM',
  'yyyy': 'yyyy',
  'yyyyMMddHH': 'yyyyMMddHH',
  'yyyyMMddHHmm': 'yyyyMMddHHmm'
}
export function getOptions(key) {
  const result = []
  for (const k in exports[key]) {
    result.push({ text: exports[key][k], value: k })
  }
  return result
}
