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
        <el-tabs tab-position="left" style="height: 200px">
          <el-tab-pane label="基本信息"
            ><div class="tab">dsfsd</div></el-tab-pane
          >
          <el-tab-pane label="商品参数">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片">商品图片</el-tab-pane>
          <el-tab-pane label="商品内容">商品内容</el-tab-pane>
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
.tab {
  margin-left: 30px;
}
</style>