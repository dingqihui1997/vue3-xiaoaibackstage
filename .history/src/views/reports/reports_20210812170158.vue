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
          var chartDom = document.getElementById("main");
          var myChart = echarts.init(chartDom);
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