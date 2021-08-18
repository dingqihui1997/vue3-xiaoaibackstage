<template>
  <div>
    <el-card>
      <div class="flex-sb"></div>
      <el-alert title="添加商品信息" type="info" center :closable="false">
      </el-alert>
    </el-card>
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
</style>