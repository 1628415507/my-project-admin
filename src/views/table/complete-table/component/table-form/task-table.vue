<!--
 * @Author: Hongzf
 * @Date: 2022-07-26 14:43:35
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-02 10:24:18
 * @Description:
-->
<template>
  <div class="table-wrap">
    <el-form ref="tableFormRef" :model="tableForm" class="tableform-wrap" size="mini" label-width="auto" :rules="tableFormRules">
      <!-- 表格 Start -->
      <el-table
        ref="multipleTable"
        highlight-current-row
        :data="tableForm.tableData"
        :row-key="rowKey"
        :reserve-selection="true"
        height="300px"
        style="width: 100%"
        border
        stripe
        size="mini"
        @select="handleRowSelect"
        @select-all="handleSelectAll"
      >
        <!-- 新增、编辑 -->
        <template v-if="type!=='detail'">
          <el-table-column type="selection" width="40" :selectable="isRowSelected" />
          <el-table-column prop="entryName" label="规范条目" min-width="140" />
        </template>
        <!-- 查看 -->
        <template v-if="type==='detail'">
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="standardEntryName" label="规范条目" min-width="130" />
        </template>
        <el-table-column prop="actionTime" label="执行时间" width="110">
          <template slot-scope="scope">
            {{ scope.row.actionTime && scope.row.actionTime.toString()?`入职后第${scope.row.actionTime}天`:'' }}
          </template>
        </el-table-column>
        <el-table-column prop="actionPeriod" label="执行周期(工时)" width="105" />
        <el-table-column v-if="type!=='detail'" prop="detailName" label="任务名称" min-width="120" />
        <el-table-column v-if="type==='detail'" prop="standardDetailName" label="任务名称" min-width="120" />
        <el-table-column prop="actionSerialNum" label="执行顺序" />
        <el-table-column v-if="type==='detail'" prop="leaderName" label="负责人" />
        <el-table-column v-if="type!=='detail'" prop="leader" label="负责人" min-width="130">
          <template slot-scope="scope">
            <el-form-item
              v-if="type!=='detail' && scope.$index >= 0"
              :prop="`tableData[${scope.$index}].leader`"
              :rules="[
                { required: (scope.row.isNeed ||scope.row.isChecked), message: '请选择', trigger: ['blur','change'] }
              ]"
            >
              <el-input
                v-model="scope.row.leader"
                placeholder="请输入"
                clearable
                class="input-width"
              />
              <!-- <UserAssociate v-model="scope.row.leader" :init-label="scope.row.leaderName" @getSelectedRows="(val)=>{ return getSelectedRows(val,scope.row)}" /> -->
              <!-- {{ scope.row.isNeed }}{{ scope.row.isChecked }} -->
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="planEndDate" label="计划完成日期" width="100" />
      </el-table>
      <!-- 表格 End -->
      <!-- 分页 -->
      <el-pagination
        v-if="type!=='detail'"
        class="pagination-wrap"
        :current-page.sync="params.currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="params.totalRecord"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <!-- :page-sizes="[10, 20, 30, 40]" -->
    </el-form>
  </div>
</template>
<script>
import { queryStandardFullDetailByTaskType } from './staff-task'
import tableMix from '@/mixins/table-mixin'
import { tempdata } from './rules'
// import UserAssociate from '@/components/CurrentSystem/UserAssociate'

export default {
  name: 'TaskTable',
  // components: { UserAssociate },
  mixins: [tableMix],
  props: {
    // 已勾选的数据
    records: {
      type: Array,
      default: () => []
    },
    // 弹窗类型
    type: {
      type: String,
      default: ''
    },
    // 任务类型
    taskType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tempdata,
      oldPage: '', // 页面切换前的页数
      pageSize: 40,
      // 表单数据
      tableForm: {
        tableData: [{}]
      },
      // 验证规则
      tableFormRules: {
        // leader: [
        //   { required: true, message: '请选择负责人', trigger: 'change' }
        // ]
      },
      selectedRecords: [],
      allSelection: []
    }
  },
  computed: {},
  watch: {
    taskType(newVal) {
      // 新增、编辑获取列表数据
      if (this.type !== 'detail') {
        newVal && this.getTableData()
      }
    },
    records: {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.selectedRecords = newVal
        if (this.type === 'detail') {
          // 详情的列表数据
          this.tableForm.tableData = newVal
        }
      }
    },
    // 监听当前页的全选数据（判断全选或取消全选）
    allSelection: {
      deep: true,
      // immediate: true,
      handler(newVal, oldVal) {
        const newLen = newVal.length
        const oldLen = oldVal.length
        // 新增数据
        if (newLen >= oldLen) {
          console.log('【全选  】-158')
          const allSelection = newVal
          // 过滤出新的数据
          const newSelection = allSelection.filter(multipleItem => {
            const isExit = this.selectedRecords.some((item) => {
              return multipleItem.standardDetailId === item.standardDetailId
            })
            return !isExit// 过滤出新的不存在的数据
          })
          // 存入数组
          newSelection.forEach(item => {
            this.selectedRecords.push({ ...item, isChecked: true })
          })
          const newIds = newSelection.map(item => item.standardDetailId)
          this.tableForm.tableData.forEach((tableItem, index) => {
            if (newIds.includes(tableItem.standardDetailId)) {
              tableItem.isChecked = true
            }
          })
        } else {
          // 删除数据
          // 过滤出被删的数据(旧数据不在新数据中存在)
          const deletedSelection = oldVal.filter(oldItem => {
            // 新数据中能找到，说明未被删除
            const isExit = newVal.some((newItem) => {
              return oldItem.standardDetailId === newItem.standardDetailId
            })
            return !isExit// 过滤出新的不存在的数据
          })
          const deletedIds = deletedSelection.map(item => item.standardDetailId)
          this.selectedRecords.forEach((item, index) => {
            if (deletedIds.includes(item.standardDetailId)) {
              this.selectedRecords.splice(index, 1)
            }
          })
          this.tableForm.tableData.forEach((tableItem, index) => {
            if (deletedIds.includes(tableItem.standardDetailId)) {
              tableItem.isChecked = false
            }
          })
          // console.log('【取消全选  】-158',)
        }
      }
    },
    // 监听页数变化
    'params.currentPage': {
      deep: true,
      handler(newVal, oldVal) {
        this.oldPage = oldVal
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    rowKey(row) {
      return row.standardDetailId
    },
    // 当前行是否可勾选
    isRowSelected(row, index) {
      return !row.isNeed
    },
    // 设置列表数据的勾选状态
    setRowSelected() {
      const tableRef = this.$refs.multipleTable
      this.$nextTick(() => {
        this.tableForm.tableData.forEach((tableItem) => {
          // 在详情数据中查找是否存在该数据，存在则勾选
          const isExit = this.selectedRecords.some((selectedItem) => {
            return tableItem.standardDetailId === selectedItem.standardDetailId
          })
          // 存在或是必选项也设为选中状态
          if (tableItem.isNeed || isExit) {
            tableItem.isChecked = true
            tableRef && tableRef.toggleRowSelection(tableItem, true)
          } else {
            tableItem.isChecked = false
          }
        })
      })
    },
    // 获取选中的执行人的附带信息
    getSelectedRows(info, row) {
      this.selectedRecords.forEach((selectedItem, index) => {
        if (row.standardDetailId === selectedItem.standardDetailId) {
          this.selectedRecords[index].leader = info.uemUserId
          this.selectedRecords[index].leaderName = info.name
        }
      })
    },
    // 回显填写的数据
    reviewData(arr, selectedRecords) {
      let tableData = []
      // 获取详情中的数据
      tableData = arr.map(item => {
        const detailArr = selectedRecords.filter((detailItem) => item.standardDetailId === detailItem.standardDetailId)
        const detailItem = detailArr[0] || {}
        // console.log('【 detailItem 】-248', detailItem)
        const { leader, leaderName, planEndDate } = detailItem
        return { ...item, leader, leaderName, planEndDate,
          // ...detailItem[0],
          isChecked: false }
      })
      return tableData
    },
    // 分页触发
    handleCurrentChange(curPage) {
      const isTableFormValid = this.validateTableForm()// 验证当前页
      this.params.currentPage = this.oldPage
      if (isTableFormValid) {
        this.params.currentPage = curPage// 切换到下一页
        // console.log('【 验证成功，切换到下一页 】-227')
        this.getTableData()
      } else {
        this.$message.error('请将勾选数据的信息填写完整')
      }
    },
    // 获取表格数据
    getTableData() {
      this.taskType && queryStandardFullDetailByTaskType({
        pageNo: this.params.currentPage,
        pageSize: this.pageSize, // this.params.pageSize,
        taskType: this.taskType
      }).then(res => {
        // this.tableForm.tableData = this.tempdata
        const _res = res.data
        this.tableForm.tableData = this.reviewData(_res.records, this.selectedRecords)
        this.setRowSelected() // 设置选中状态
        this.params.totalRecord = _res.totalRecord
      })
    },
    // 勾选数据行的 Checkbox 时触发的事件
    handleRowSelect(selection, row) {
      // 判断是否是勾选操作
      const isChecked = selection.some((item) => {
        return item.standardDetailId === row.standardDetailId
      })
      // 标记列的勾选状态
      row.isChecked = isChecked
      // 勾选操作-选中
      if (isChecked) {
        this.selectedRecords.push(row)
      } else {
      // 取消选中
        this.selectedRecords.forEach((item, index) => {
          if (item.standardDetailId === row.standardDetailId) {
            this.selectedRecords.splice(index, 1)
          }
        })
      }
    },
    // 全选
    handleSelectAll(allSelection) {
      this.allSelection = [...allSelection]// ☆必须用浅拷贝
    },
    // 验证表格
    validateTableForm() {
      let isTableFormValid = false
      this.$refs.tableFormRef.validate(valid => {
        isTableFormValid = valid
        // 更新数据
        this.$emit('update:records', this.selectedRecords)
      })
      return isTableFormValid
    }
  }
}
</script>
<style lang="scss" scoped>
.table-wrap {
  width:750px;
  .btn-wrap {
    display: flex;
    justify-content: flex-end;
  }
  // 操作栏
  .operate-wrap {
    span {
      display: inline-block;
      cursor: pointer;
    }
  }
  // 分页
  .pagination-wrap {
    margin: 10px;
    float: right;
  }
}
</style>
