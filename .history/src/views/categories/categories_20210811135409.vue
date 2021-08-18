<template>
  <el-card>
    <el-button type="primary">添加分类</el-button>
    <el-table
      :data="tabledata"
      style="width: 100%; margin-bottom: 20px"
      row-key="cat_id"
      current-row-key="index"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column label="#" width="180" :indent="10"> </el-table-column>
      <el-table-column prop="cat_name" label="分类名称" width="180">
      </el-table-column>
      <el-table-column prop="name" label="是否有效" width="180">
      </el-table-column>
      <el-table-column label="操作"> </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import api from "../../http/api";
interface Obj {
  cat_id: number;
  cat_level: number;
  cat_deleted: boolean;
  cat_name: string;
  cat_pid: number;
  children: Obj[];
}
export default defineComponent({
  setup() {
    let pagenum = ref<number>(1); //页数
    let pagesize = ref<number>(10); //每页条数
    let total = ref<number>(0); //总条数
    let tabledata = ref<Obj[]>([]); //分类数据
    onMounted(() => {
      getcategories1();
    });
    let getcategories1 = () => {
      api
        .getcategories1({ pagenum: pagenum.value, pagesize: pagesize.value })
        .then((res: any) => {
          total.value = res.total;
          tabledata.value = res.data.result;

          console.log(tabledata.value);
        })
        .catch((err) => {
          console.log(err, "获取分类失败");
        });
    };
    return {
      tabledata,
    };
  },
});
</script>

<style scoped>
</style>