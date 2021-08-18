<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary">添加角色</el-button>
      <el-table :data="arr" style="width: 100%" :border="true">
        <el-table-column type="expand">
          <template #default="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品 ID" prop="id"> </el-table-column>
        <el-table-column label="商品名称" prop="name"> </el-table-column>
        <el-table-column label="描述" prop="desc"> </el-table-column>
      </el-table>
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
    //获取角色列表
    let roleslist = () => {
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
    return {
      arr,
    };
  },
});
</script>

<style scoped>
</style>