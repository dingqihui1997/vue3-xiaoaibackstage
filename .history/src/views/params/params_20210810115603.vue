<template>
  <el-card>
    <el-alert title="不可关闭的 alert" type="warning" :closable="false">
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