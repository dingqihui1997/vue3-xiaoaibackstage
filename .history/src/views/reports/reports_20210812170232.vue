<template>
  <div id="main">数据报表</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import api from "@/http/api";
import * as echarts from "echarts";

export default defineComponent({
  setup() {
    let chartDom = document.getElementById("main") as any;
    let myChart = echarts.init(chartDom);
    onMounted(() => {
      reports();
    });
    let reports = () => {
      api
        .reports()
        .then((res) => {
          console.log(res);
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
</style>