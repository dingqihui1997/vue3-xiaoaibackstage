<template>
  <div>权限管理</div>
  <el-card></el-card>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import api from "../../http/api";

export default defineComponent({
  setup() {
    onMounted(() => {
      rightslist();
    });
    // 获取权限列表
    const rightslist = () => {
      api
        .rightslist({ type: "list" })
        .then((res: any) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err, "获取权限列表失败");
        });
    };
    return {};
  },
});
</script>

<style scoped>
</style>