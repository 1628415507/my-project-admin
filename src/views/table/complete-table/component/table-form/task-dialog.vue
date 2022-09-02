<!--
 * @Author: Hongzf
 * @Date: 2022-08-02 10:15:03
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-02 10:24:10
 * @Description:
-->

<template>
  <el-dialog
    class="staff-task-dialog"
    :title="dialogTitle"
    v-bind="$attrs"
    width="1000px"
    center
    :close-on-click-modal="false"
    top="10vh"
    destroy-on-close
    z-index="1000"
    :append-to-body="true"
    v-on="$listeners"
  >
    <el-form
      ref="elForm"
      :model="formData"
      :rules="rules"
      size="mini"
      label-width="100px"
      :inline="true"
      :disabled="type === 'detail'"
    >
      <div class="form-wrap">
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题:" prop="taskTitle">
              <el-input
                v-model="formData.taskTitle"
                placeholder="请输入标题，执行人姓名+任务类型"
                clearable
                class="input-width"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 在职状态（0：试用员工 1：正式员工 2：离职员工） -->
            <el-form-item label="在职状态:" prop="status">
              <el-radio-group v-model="formData.status" disabled>
                <el-radio
                  v-for="item in jobStatusOptions"
                  :key="'jobStatus' + item.value"
                  :label="item.value"
                >{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="执行人:" prop="executor">
              <el-input
                v-model="formData.executor"
                placeholder="请输入标题，执行人姓名+任务类型"
                clearable
                class="input-width"
              />
              <!-- <UserAssociate
                v-model="formData.executor"
                :init-label="formData.executorName"
                class="input-width"
                placeholder="请选择执行人"
                @getSelectedRows="getSelectedRows"
              /> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务类型:" prop="taskType">
              <el-select
                v-model="formData.taskType"
                placeholder="请选择任务类型"
                clearable
                class="input-width"
                @change="handleTaskTypeChange(formData.taskType,[])"
              >
                <el-option
                  v-for="(item) in taskTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="员工任务:" prop="taskList">
              <div class="table-wrap">
                <TaskTable
                  ref="taskTableRef"
                  :records.sync="selectedRecords"
                  :type="type"
                  :task-type="formData.taskType"
                />
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="type === 'detail'">
          <el-col :span="12">
            <el-form-item label="创建时间:">
              <el-input
                v-model="createTime"
                placeholder="请输入创建时间"
                clearable
                class="input-width"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建人:">
              <el-input
                v-model="formData.creatorName"
                placeholder="请输入创建人"
                clearable
                class="input-width"
                disabled
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        v-if="type !== 'detail'"
        type="primary"
        size="medium"
        @click="handleConfirm"
      >提交</el-button>
      <el-button
        type="primary"
        :plain="true"
        size="medium"
        @click="close"
      >{{ type === 'detail'?'关闭':'取消' }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import TaskTable from './task-table'
// import UserAssociate from '@/components/CurrentSystem/UserAssociate'
import { getTaskInfoDetail, saveTaskInfo, updateTaskInfo, queryNeedStandardFullDetailByTaskType } from './staff-task'
import { formRules } from './rules'

export default {
  components: { TaskTable },
  props: {
    // 编辑信息
    editData: {
      type: Object,
      default: () => {}
    },
    // 弹窗类型
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectedRecords: [],
      rules: formRules, // 验证规则
      formData: {
        taskInfoId: '',
        taskTitle: '',
        executor: '', // 执行人
        executorName: '',
        status: '', // 在职状态（0：试用员工 1：正式员工 2：离职员工）
        taskType: '', //
        taskDetailInfoDtoList: [], // 列表勾选值
        createTime: '',
        creatorName: ''
      },
      createTime: '',
      // 任务类型下拉
      taskTypeOptions: this.$dict.getDictOptions('TASK_TYPE')
    }
  },
  computed: {
    // 弹框标题
    dialogTitle() {
      this.editData.taskInfoId && this.getDetailInfo()
      return this.editData.taskInfoId
        ? this.type === 'detail'
          ? '任务详细信息'
          : '编辑任务信息'
        : '新增任务'
    },
    // 在职状态下拉 （0：试用员工 1：正式员工 2：离职员工）
    jobStatusOptions() {
      return this.$dict.getDictOptions('JOB_STATUS').filter(item => item.value.toString() === '0' || item.value.toString() === '1')
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 获取选中的执行人的附带信息（在职状态）
    getSelectedRows(row) {
      this.formData.status = row.jobStatus
    },
    // 任务类型变化-获取必选问题
    handleTaskTypeChange(taskType, arr = []) {
      let selectedRecords = []
      taskType && queryNeedStandardFullDetailByTaskType({
        taskType
      }).then(res => {
        const requiredList = res.data
        requiredList.forEach(requiredItem => {
          // 判断详情中是否已存在必选项
          const isExist = arr.some((selectedItem) => requiredItem.standardDetailId === selectedItem.standardDetailId)
          if (!isExist) {
            // 不存在则加入
            arr.push({
              ...requiredItem,
              isNeed: true
            })
          }
        })
        // 遍历判断是否是必选项
        selectedRecords = arr.map(selectedItem => {
          const isExist = res.data.some((requiredItem) => requiredItem.standardDetailId === selectedItem.standardDetailId)
          return {
            ...selectedItem,
            isNeed: isExist
          }
        })
        this.selectedRecords = selectedRecords
        console.log('【 this.selectedRecords 】-241', this.selectedRecords)
      })
    },
    // 关闭弹框
    close() {
      this.$emit('update:visible', false)
      this.$refs['elForm'].resetFields()
    },
    // 编辑、查看——获取详细信息
    getDetailInfo() {
      getTaskInfoDetail({ taskInfoId: this.editData.taskInfoId }).then(res => {
        const result = res.data
        // 表单数据
        for (const key in this.formData) {
          if (key === 'status') {
            this.formData[key] = result[key].toString() || ''
          } else {
            this.formData[key] = result[key] || ''
          }
          this.createTime = this.$moment(this.formData.createTime).format('YYYY-MM-DD')
        }
        // 列表数据
        this.selectedRecords = result.taskDetailInfoDtoList
      })
    },
    // 提交表单信息
    handleConfirm() {
      const isTableFormValid = this.$refs.taskTableRef.validateTableForm()
      this.formData.taskDetailInfoDtoList = this.selectedRecords.map(item => {
        const { standardDetailId, leader } = item
        return { standardDetailId, leader: leader ? leader.toString() : '' }
      })
      if (!this.formData.taskDetailInfoDtoList.length) {
        this.$message.error('请选择任务')
        return false
      }
      this.$refs['elForm'].validate(valid => {
        if (isTableFormValid && valid) {
          const funcName = this.editData.taskInfoId ? updateTaskInfo : saveTaskInfo
          funcName(this.formData).then(res => {
            if (res.success) {
              this.$message.success(res.data)
              this.$emit('getTableData', '')
              this.close()
            } else {
              this.$message.error(res.errorMessages[0])
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.staff-task-dialog {
  .form-wrap {
    min-height: 380px;
    margin-bottom: 20px;
    .input-width {
      width: 240px !important;
    }
    .table-wrap{
      width:750px;
    }
  }
  // 底部按钮
  .dialog-footer {
    width: 100%;
    // background: #bcf;
    display: flex;
    justify-content: center;
    .el-button--default.el-button--mini {
      min-width: 92px;
    }
  }
}
</style>
