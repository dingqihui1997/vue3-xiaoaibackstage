<template>
  <el-container>
    <el-header>
      <div class="wi100 flex-sba">
        <div class="flex-a">欢迎来到小爱后台系统</div>
        <div></div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>