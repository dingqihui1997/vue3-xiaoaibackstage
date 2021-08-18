<template>
  <el-card>
    <el-alert
      title="注意:只允许为第三级分类设置相关参数!"
      type="warning"
      :closable="false"
      show-icon
    >
    </el-alert>
  </el-card>
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