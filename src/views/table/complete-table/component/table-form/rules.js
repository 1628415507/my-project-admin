/*
 * @Author: Hongzf
 * @Date: 2022-08-03 12:39:32
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-09 18:50:11
 * @Description:
 */

export const tempdata = [
  {
    taskTitle: 'taskTitle',
    leader: '6958664088091697152',
    required: true,
    checked: true,
    actionPeriod: 1,
    actionSerialNum: 0,
    actionTime: 2,
    planEndDate: 1636732800000,
    planStartDate: 1636732800000,
    progress: null,
    resultAccess: null,
    standardDetailId: '11',
    standardDetailName: '细则名称1',
    standardEntryId: '1111',
    standardEntryName: '规范条目11111',
    startDate: null,
    status: 0,
    taskDetailId: '6960507338410762240',
    taskInfoId: '6960507337878085632',
    taskName: null
  },
  {
    taskTitle: 'taskTitle',
    leader: '',
    required: true,
    checked: true,
    standardEntryName: '规范条目222'
  }
]

export const formRules = {
  taskTitle: [
    {
      required: true,
      message: '请输入标题',
      trigger: 'blur'
    }
  ],
  executor: [
    {
      required: true,
      message: '请选择执行人',
      trigger: 'change'
    }
  ],
  status: [
    {
      required: true,
      message: '请选择在职状态',
      trigger: 'change'
    }
  ],
  taskType: [
    {
      required: true,
      message: '请选择任务类型',
      trigger: 'change'
    }
  ]
}
