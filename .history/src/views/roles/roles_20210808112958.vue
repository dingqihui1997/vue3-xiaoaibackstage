<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" @click="add">添加角色</el-button>
      <el-table :data="arr" style="width: 100%" :border="true">
        <el-table-column type="expand">
          <template #default="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
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
        <el-table-column
          type="index"
          label="#"
          align="center"
        ></el-table-column>
        <el-table-column label="职位" prop="roleDesc" align="center">
        </el-table-column>
        <el-table-column label="描述" prop="roleName" align="center">
        </el-table-column>
        <el-table-column label="操作" prop="desc" align="center">
          <template #default="scope">
            <el-button type="primary" size="mini" @click="handle(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" size="mini">删除</el-button>
            <el-button type="warning" size="mini">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="编辑用户" v-model="show" width="40%">
        <el-form
          :model="edit"
          :rules="rules"
          ref="submit"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="edit.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="edit.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="edit.mobile"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="show = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </span>
        </template>
      </el-dialog>
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
    const arr = ref<Obj[]>([]); //角色列表
    const show = ref<boolean>(false); //添加角色弹框
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
    let handle = (item: any) => {
      //
    };
    // 添加角色
    let add = () => {
      //
    };
    return {
      arr,
      handle,
      add,
    };
  },
});
</script>

<style scoped>
</style>