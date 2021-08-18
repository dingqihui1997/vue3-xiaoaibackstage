<template>
  <div>权限管理</div>
  <el-card></el-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import api from "../../http/api";
interface Obj {
  id: number;
  authName: string;
  level: string;
  path: string;
  pid: number;
}
export default defineComponent({
  setup() {
    let list = ref<Obj[]>([]);
    onMounted(() => {
      rightslist();
    });
    // 获取权限列表
    const rightslist = () => {
      api
        .rightslist({ type: "list" })
        .then((res: any) => {
          list.value = res.data;
          console.log(list.value);
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