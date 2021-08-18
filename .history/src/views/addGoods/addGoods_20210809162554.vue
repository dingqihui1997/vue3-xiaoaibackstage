<template>
  <el-card>
    <div class="top">
      <el-alert title="添加商品信息" type="info" center :closable="false">
      </el-alert>
    </div>
    <div class="top steps">
      <el-steps :active="active" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <div class="flex-sb">
      <div>
        <el-tabs :tab-position="left" style="height: 200px">
          <el-tab-pane label="用户管理">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
      <div></div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    let active = ref<number>(0);
    return {
      active,
    };
  },
});
</script>

<style scoped>
.top {
  margin-left: 150px;
}
.steps {
  margin-top: 30px;
}
</style>