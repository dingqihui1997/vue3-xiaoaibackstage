<template>
  <div>权限管理</div>
  <el-card>
    <el-table
      row-key="date"
      ref="filterTable"
      :data="list"
      style="width: 100%"
      :border="true"
    >
      <el-table-column
        type="index"
        label="#"
        width="100"
        column-key="date"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="760"
        align="center"
      ></el-table-column>
      <el-table-column label="权限等级" width="760" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.level == 0">一级</el-tag>
          <el-tag v-if="scope.row.level == 1" type="success">二级</el-tag>
          <el-tag v-if="scope.row.level == 2" type="warning">三级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
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
    return {
      list,
    };
  },
});
</script>

<style scoped>
</style>