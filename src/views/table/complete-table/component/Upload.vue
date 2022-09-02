<!--
 * @Author: Hongzf
 * @Date: 2022-08-04 17:34:53
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-02 10:00:58
 * @Description: 上传
-->

<template>
  <div>
    自定义插槽
  </div>
</template>
<script>
// import { downloadFile } from '@/utils/util'
// import { deleteResume } from '@/api/staff-query.js'

export default {
}
</script>
<style lang="scss" coped>
.el-upload-list__item-name {
    color: #606266;
    display: block;
    margin-right: 40px;
    overflow: hidden;
    padding-left: 4px;
    text-overflow: ellipsis;
    -webkit-transition: color .3s;
    transition: color .3s;
    white-space: nowrap;
    width: 170px;
}
.sys-file-list-item{
    position: relative;
    display: flex;
    align-items: center;
    .file-name{
        color: #606266;
        display: inline-block;
        margin-right: 40px;
        overflow: hidden;
        padding-left: 4px;
        text-overflow: ellipsis;
        -webkit-transition: color .3s;
        transition: color .3s;
        white-space: nowrap;
        width: 170px;
    }
    &:hover{
      background-color: #f5f7fa;
      .file-name{
        // padding-right: 20px;
        color: #0050AC;
        cursor: pointer;
      }
      .check{
        display: none;
      }
      .close{
        display: inline-block;
        cursor: pointer;
        &:hover{
          color: #0050AC;
        }
      }
    }
    .check,.close{
      position: absolute;
      top: 11px;
      right: 5px;
    }
    .close{
      display: none;
    }
  }
</style>
