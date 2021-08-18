<template>
  <el-card>
    <el-button type="primary">添加分类</el-button>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import api from "../../http/api";
export default defineComponent({
  setup() {
    let pagenum = ref<number>(1); //页数
    let pagesize = ref<number>(10); //每页条数
    onMounted(() => {
      getcategories1();
    });
    let getcategories1 = () => {
      api
        .getcategories1({ pagenum: pagenum.value, pagesize: pagesize.value })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err, "获取分类失败");
        });
    };
    return {};
  },
});
</script>

<style scoped>
</style>