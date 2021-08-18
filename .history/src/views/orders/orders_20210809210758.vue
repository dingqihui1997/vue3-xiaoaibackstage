<template>
  <el-card class="box-card"></el-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import api from "../../http/api";
export default defineComponent({
  setup() {
    let query = ref<string>("");
    let pagenum = ref<number>(1); //页数
    let pagesize = ref<number>(10); //每页返回条数
    const total = ref<number>(0); //总条数
    onMounted(() => {});
    let orders = () => {
      api
        .orders({
          query: query.value,
          pagenum: pagenum.value,
          pagesize: pagesize.value,
        })
        .then((res: any) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err, "请求订单列表失败");
        });
    };
    return {};
  },
});
</script>

<style scoped>
</style>