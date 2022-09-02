/*
 * @Author: Hongzf
 * @Date: 2022-08-08 18:45:59
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-02 08:58:41
 * @Description:
 */

// 转正申请
export const regularFormRules = {
  // 进行中（项目经理）
  faceTime: [
    {
      required: true,
      message: '请选择面谈时间',
      trigger: 'change'
    }
  ],
  faceResult: [
    {
      required: true,
      message: '请选择面谈结果',
      trigger: 'change'
    }
  ],
  faceScore: [
    {
      required: true,
      message: '请输入转员工答辩成绩',
      trigger: 'blur'
    }
  ],
  uemUserId: [
    {
      required: true,
      message: '请选择提交审批人',
      trigger: 'change'
    }
  ],
  faceRemark: [
    {
      required: true,
      message: '请输入面谈评语',
      trigger: 'blur'
    }
  ],
  // 进行中（部门领导）
  approvalDate: [
    {
      required: true,
      message: '请选择审批时间',
      trigger: 'change'
    }
  ],
  resultAccess: [
    {
      required: true,
      message: '请选择审批结果',
      trigger: 'change'
    }
  ],
  offerRemark: [
    {
      required: true,
      message: '请输入转正评语',
      trigger: 'blur'
    }
  ]
}

// 离职申请
export const quitFormRules = {
  // 进行中
  auditDate: [
    {
      required: true,
      message: '请选择审核时间',
      trigger: 'change'
    }
  ],
  auditResult: [
    {
      required: true,
      message: '请选择审核结果',
      trigger: 'change'
    }
  ],
  auditRemark: [
    {
      required: true,
      message: '请输入审核意见',
      trigger: 'change'
    }
  ],
  approver: [
    {
      required: true,
      message: '请选择提交审批人',
      trigger: 'change'
    }
  ],
  // 进行中（部门领导）
  approvalDate: [
    {
      required: true,
      message: '请选择审批时间',
      trigger: 'change'
    }
  ],
  approvalRemark: [
    {
      required: true,
      message: '请选择审批意见',
      trigger: 'change'
    }
  ],
  resultAccess: [
    {
      required: true,
      message: '请选择审批结果',
      trigger: 'change'
    }
  ]
}
