<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary">添加角色</el-button>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import api from "../../http/api";
interface Obj {
  id: number;
  roleDesc: string;
  roleName: string;
  childre: Obj[];
}
export default defineComponent({
  setup() {
    const arr = ref<Obj[]>([]);
    onMounted(() => {
      roleslist();
    });
    let roleslist = () => {
      //获取角色列表
      api
        .roleslist()
        .then((res: any) => {
          arr.value = res.data;
          console.log(arr.value);
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