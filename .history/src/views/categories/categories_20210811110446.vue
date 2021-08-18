<template>
  <el-card>
    <el-button type="primary">添加分类</el-button>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    let pagenum = ref<number>(1); //页数
    let pagesize = ref<number>(10); //每页条数
    return {};
  },
});
</script>

<style scoped>
</style>