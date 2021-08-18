<template>
  <div>商品列表</div>
  <div class="user">
    <div class="flex">
      <div>
        <el-input placeholder="请输入内容" v-model="input"> </el-input>
      </div>
      <div>
        <el-button
          type="info"
          icon="el-icon-search"
          :plain="true"
          @click="search"
        ></el-button>
      </div>
      <div class="mal20">
        <el-button type="primary" @click="click">添加商品</el-button>
      </div>
    </div>
  </div>
  <el-table :data="arr" border style="width: 100%">
    <el-table-column
      fixed
      prop="date"
      label="#"
      width="150"
      type="index"
      align="center"
    >
    </el-table-column>
    <el-table-column prop="username" label="姓名" width="120" align="center">
    </el-table-column>
    <el-table-column prop="role_name" label="角色" width="120" align="center">
    </el-table-column>
    <el-table-column prop="mobile" label="电话" width="120" align="center">
    </el-table-column>
    <el-table-column prop="email" label="邮箱" width="600" align="center">
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="handleEdit(scope.$index, scope.row, 1)"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="handleEdit(scope.$index, scope.row, 2)"
        ></el-button>
        <el-button
          type="warning"
          icon="el-icon-setting"
          size="mini"
          @click="handleEdit(scope.$index, scope.row, 3)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    let input = ref<string>(""); //搜索框
    // 搜索按钮
    let search = () => {
      //
    };
    // 添加商品
    let click = () => {
      //
    };
    // 操作编辑删除
    let handleEdit = (index: number, item: any, num: number) => {
      //
    };
    return {
      input,
      search,
      click,
    };
  },
});
</script>

<style scoped>
.user {
  width: 100%;
}
.el-input {
  width: 370px !important;
  height: 40px !important;
  margin-bottom: 20px;
}
.el-button--info {
  margin-left: -10px;
}
.el-input {
  width: 560px !important;
}
</style>