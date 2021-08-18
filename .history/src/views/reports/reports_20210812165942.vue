<template>
  <div>数据报表</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import api from "@/http/api";
export default defineComponent({
  setup() {
    onMounted(() => {
      reports();
    });
    let reports = () => {
      api
        .reports()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return {};
  },
});
</script>

<style scoped>
</style>