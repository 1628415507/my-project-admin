<!--
 * @Author: Hongzf
 * @Date: 2022-08-05 17:38:09
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-02 10:16:38
 * @Description: 我的任务
-->

<template>
  <div class="app-container my-task">
    <!-- 查询组件 -->
    <filter-panel :filter-config="filterConfig" :value="filterForm" />
    <!-- 表格 Start -->
    <table-component
      :data="tableData"
      :options="tableConfig"
      :pagination="params"
      :columns="columns"
      :operates="operates"
      :list-loading="listLoading"
      @handleIndexChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    >
      <!-- 自定义插槽 Start -->
      <!-- 任务标题 -->
      <template #taskTitle="scope">
        <el-button type="text" @click="handleOpen(scope.row, 'edit')">{{ scope.row.taskTitle }}</el-button>
      </template>
      <!-- 自定义插槽 End -->
    </table-component>
    <!-- 表格 End -->
    <!-- 试验任务 -->
    <TaskDialog
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :edit-data="editData"
      :type="openType"
      :user-type="userType"
      @getTableData="getTableData"
    />
    <!--离职 辞退 -->
    <QuitDialog
      v-if="quitDialogVisible"
      :visible.sync="quitDialogVisible"
      :edit-data="editData"
      :type="openType"
      @getTableData="getTableData"
    />
  </div>
</template>
<script>
import tableMix from '@/mixins/table-mixin'
import { filterConfig, tableConfig, columns, operates } from './config-data.js'
import TaskDialog from './component/table-form/task-dialog'
// import RegularDialog from './component/table-form/regular-dialog'
import QuitDialog from './component/quit-dialog'
// import {
//   queryTaskDetailInfo,
//   queryTaskInfoPageByUemUser
// } from '@/api/my-task'

export default {
  name: 'MyTask',
  components: {
    TaskDialog,
    // RegularDialog,
    QuitDialog
  },
  mixins: [tableMix],
  data() {
    return {
      // 查询
      filterConfig: filterConfig(this),
      filterForm: {
        taskTitle: '',
        status: ''
      },
      // 表格
      columns: columns(this),
      operates: operates(this),
      listLoading: false,
      tableConfig,
      tableData: [{}],
      // 弹框
      userType: '',
      editData: {},
      openType: '', // 类型：详情、编辑、添加
      dialogVisible: false,
      regularDialogVisible: false,
      quitDialogVisible: false
    }
  },
  computed: {},
  created() {
    this.getTableData()
  },
  mounted() {},
  methods: {
    // 获取表格数据
    getTableData() {
      // // this.listLoading = true;
      // queryTaskInfoPageByUemUser({
      //   pageNo: this.params.currentPage,
      //   pageSize: this.params.pageSize,
      //   ...this.filterForm
      // }).then(res => {
      //   const _res = res.data
      //   this.tableData = _res.records
      //   this.params.totalRecord = _res.totalRecord
      //   this.listLoading = false
      // })
    },
    // 打开弹框
    handleOpen(item = {}, type) {
      console.log('【 type 】-117', type)
      this.openType = type
      // 编辑/查看
      if (['detail', 'edit'].includes(type)) {
        this.dialogVisible = true
      }
      // 转正
      if (type === 'regular') {
        this.regularDialogVisible = true
      }
      // 离职
      if (['quit', 'dismiss'].includes(type)) {
        this.quitDialogVisible = true
      }
      // this.editData = { uemUserId: item.uemUserId || '' }
    },
    // 删除
    handleDelete(uemUserId) {
      this.$confirm(
        '您确定要删除该信息吗？删除后该信息不可恢复。',
        '删除提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        // deleteStaff({ uemUserId }).then(() => {
        this.$message.success('操作成功')
        //   this.getTableData()
        // })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.my-task {
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
