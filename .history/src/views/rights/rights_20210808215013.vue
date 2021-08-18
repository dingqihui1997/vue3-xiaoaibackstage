<template>
  <div>权限管理</div>
  <el-card>
    <el-table row-key="date" ref="filterTable" :data="list" style="width: 100%">
      <el-table-column type="index" label="#" width="180" column-key="date">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址" :formatter="formatter">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="100"
        :filters="[
          { text: '家', value: '家' },
          { text: '公司', value: '公司' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-tag
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.tag }}</el-tag
          >
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