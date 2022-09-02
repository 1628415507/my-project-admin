export const filterConfig = _this => {
  return {
    inline: false,
    gutter: 3, // 栅格的间隔
    col: 6, // 栅格的格数
    operateCol: 8,
    labelWidth: '100px',
    filterList: [
      {
        type: 'input',
        label: '标题',
        prop: 'taskTitle',
        width: '200px',
        clearable: true,
        placeholder: '请输入标题',
        col: 8
      },
      {
        type: 'select',
        label: '任务状态',
        prop: 'status',
        width: '200px',
        clearable: true,
        placeholder: '请选择任务状态',
        col: 8,
        optionLabel: 'label',
        optionValue: 'value',
        optionKey: 'value',
        options: [
          // { value: '', label: '全部' },
          // ..._this.$dict.getDictOptions('MY_TASK_STATUS')
        ],
        changeSelect: optionVal => {
          _this.filterForm.status = optionVal
        }
      }
    ],
    operates: [
      {
        type: 'primary',
        buttonLabel: '查询',
        btnType: 'primary',
        method: () => {
          _this.handleQuery()
        }
      },
      {
        type: 'primary',
        buttonLabel: '重置',
        btnType: 'primary',
        plain: true,
        method: () => {
          _this.resetQueryForm(_this.filterForm, ['userType'])
        }
      }
    ]
  }
}

// table 的配置参数
export const tableConfig = {
  border: true,
  stripe: true, // 是否为斑马纹 table
  loading: false, // 是否添加表格loading加载动画
  highlightCurrentRow: true, // 是否支持当前行高亮显示
  mutiSelect: false, // 是否支持列表项选中功能
  indexShow: true,
  pagination: true,
  height: '350px'
}

// 表格列
export const columns = _this => {
  return [
    {
      prop: 'taskTitle',
      label: '任务标题',
      customSlot: true // 自定义插槽
      // render函数
      // render: (h, ctx) => {
      //   // console.log('【 h, ctx 】-121', h, ctx)
      //   return h(
      //     'el-button',
      //     {
      //       props: {
      //         type: 'text',
      //         size: 'small'
      //         // ghost: true
      //       },
      //       on: {
      //         click: () => {
      //           _this.handleOpen(ctx.row, 'edit');
      //         }
      //       }
      //     },
      //     ctx.row.taskTitle// 文本值
      //   );
      // }
    },
    {
      prop: 'taskType',
      label: '任务类型'
    },
    {
      prop: 'publishDate',
      label: '发布日期'
    },
    {
      prop: 'planEndDate',
      label: '计划完成日期',
      width: '120px'
    },
    {
      prop: 'dispatchersName',
      label: '任务创建人',
      width: '120px'
    },
    {
      prop: 'status',
      label: '任务状态'
      // formatter: (row, column) => {
      //   return _this.$dict.getDictNameByCode('MY_TASK_STATUS', row.status)
      // }
    },
    {
      prop: 'endDate',
      label: '完成时间'
    }
  ]
}
// 操作列 - 不显示
// export const operates = _this => {
//   return {
//     list: [
//       { show: false }
//     ],
//     fixed: false,
//     width: 200
//   }
// }
// 操作列 - 显示
export const operates = _this => {
  return {
    list: [
      {
        id: 'quit',
        label: '表单弹框',
        type: 'text',
        show: (index, row) => {
          return row.jobStatus !== '2' // 离职员工不展示
        },
        disabled: false,
        method: (row, index) => {
          _this.handleOpen(row, 'quit')
        }
      },
      {
        id: 'dismiss',
        label: '表单弹框',
        type: 'text',
        show: (index, row) => {
          return row.jobStatus !== '2' // 离职员工不展示
        },
        disabled: false,
        method: (row, index) => {
          _this.handleOpen(row, 'dismiss')
        }
      },
      {
        id: 'edit',
        label: '表格弹框',
        type: 'text',
        show: true,
        disabled: false,
        method: (row, index) => {
          console.log('【 row 】-172', row)
          // console.log('【 index 】-163', index)
          _this.handleOpen(row, 'edit')
        }
      },
      {
        id: 'detail',
        label: '查看',
        type: 'text',
        show: true,
        disabled: false,
        method: (row) => {
          _this.handleOpen(row, 'detail')
        }
      },

      {
        id: 'delete',
        label: '删除',
        // icon: 'el-icon-delete',
        type: 'text',
        show: true,
        plain: false,
        method: (row, index) => {
          _this.handleDelete(row.uemUserId)
        }
      }
    ],
    fixed: false,
    width: 250
  } // 列操作按钮
}
