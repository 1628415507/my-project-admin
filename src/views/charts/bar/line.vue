<!--
 * @Author: Hongzf
 * @Date: 2022-09-01 15:47:14
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-01 16:58:48
 * @Description:
-->
<template>
  <div class="chart-container">
    <chart height="100%" width="100%" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/LineChart/LineMarker'

export default {
  name: 'BaseChart',
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

