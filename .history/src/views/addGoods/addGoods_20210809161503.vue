<template>
  <el-card>
    <div class="top">
      <el-alert title="添加商品信息" type="info" center :closable="false">
      </el-alert>
    </div>
    <div>
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
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
</style>