<!--
 * @Author: Hongzf
 * @Date: 2022-09-01 16:15:31
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-01 17:28:32
 * @Description:
-->
<template>
  <div class="chart-container">
    <chart height="100%" width="100%" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/PieChart/RingPie'

export default {
  name: 'RingPie',
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

