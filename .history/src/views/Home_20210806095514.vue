<template>
  <div>
    <div class="top flex-a">
      <div class="topone font14">首页</div>
    </div>
    <div>欢迎来到小爱后台管理系统</div>
  </div>
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
.top {
  /* margin: 10px; */
  margin-top: -10px;
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid #eee;
}
.topone {
  background: #409eff;
  padding: 0px 10px;
  color: #fff;
}
</style>
