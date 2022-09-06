<!--
 * @Author: Hongzf
 * @Date: 2022-09-01 16:15:31
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-05 16:41:32
 * @Description:
-->
<template>
  <div class="chart-container">
    <chart height="100%" width="100%" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/BarChart/BaseBarMultiple'

export default {
  name: 'BaseBar',
  components: { Chart }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

