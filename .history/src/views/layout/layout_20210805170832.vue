<template>
  <el-container>
    <el-header>
      <div class="wi100 flex-sba hei100">
        <div class="flex-ja mal10 font16">欢迎来到小爱后台系统</div>
        <div class="flex">
          <div>{{ time }}</div>
          <div class="mal10">亲爱的，admin</div>
          <div class="mal10 margin-r20">退出</div>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import dayjs from "dayjs";
export default defineComponent({
  setup() {
    let time = ref<any>(null);
    setInterval(() => {
      time.value =
        new Date().toLocaleString() + " ".charAt(new Date().getDay());
    }, 1000);
    return {
      time,
    };
  },
});
</script>

<style scoped>
</style>