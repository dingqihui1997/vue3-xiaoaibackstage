<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary">添加角色</el-button>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import api from "../../http/api";
export default defineComponent({
  setup() {
    onMounted(() => {
      roleslist();
    });
    let roleslist = () => {
      api
        .roleslist()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err, "获取角色列表失败");
        });
    };
    return {};
  },
});
</script>

<style scoped>
</style>