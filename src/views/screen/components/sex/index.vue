<template>
  <div class="box1">
    <div class="title">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="sex">
      <div class="man">
        <span>男士</span>
        <img src="../../images/man.png" alt="" />
      </div>
      <div class="women">
        <p>女士</p>
        <img src="../../images/woman.png" alt="" />
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女生42%</p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
let charts = ref()
onMounted(() => {
  let mycharts = echarts.init(charts.value)
  mycharts.setOption({
    title: {
      text: '男女比例',
      textStyle: {
        color: 'skyblue',
      },
      left: '40%',
    },
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          borderRadius: 20,
        },
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 20,
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.box1 {
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .sex {
    display: flex;
    justify-content: space-evenly;
    margin-top: 40px;
    .man {
      background: url('../../images/man-bg.png');
      width: 111px;
      height: 115px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      span {
        color: white;
      }
    }
    .women {
      width: 111px;
      height: 115px;
      background: url('../../images/woman-bg.png');
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      p {
        color: white;
      }
    }
  }
  .rate {
    display: flex;
    justify-content: space-evenly;
    color: white;
    margin-top: 20px;
  }
  .charts {
    height: 100px;
  }
}
</style>
