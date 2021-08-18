<template>
  <div id="main">数据报表</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import api from "@/http/api";
import * as echarts from "echarts";

export default defineComponent({
  setup() {
    onMounted(() => {
      reports();
    });
    let reports = () => {
      api
        .reports()
        .then((res) => {
          console.log(res);
          let chartDom = document.getElementById("main") as any;
          let myChart = echarts.init(chartDom) as any;
          myChart.setOption(res.data) as any;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return {};
  },
});
</script>

<style scoped>
#main {
  width: 100%;
  height: 400px;
}
</style>