<template>
  <el-card class="box-card"></el-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    let query = ref<string>("");
    let pagenum = ref<number>(1); //页数
    let pagesize = ref<number>(10); //每页返回条数
    const total = ref<number>(0); //总条数
    onMounted(() => {});
    return {};
  },
});
</script>

<style scoped>
</style>