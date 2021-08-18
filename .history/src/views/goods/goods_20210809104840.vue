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
        <el-button type="primary" @click="click">添加用户</el-button>
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
    <el-table-column prop="mg_state" label="状态" width="120" align="center">
      <template #default="scope">
        <el-switch
          v-model="scope.row.mg_state"
          @click="change(scope.row)"
        ></el-switch>
      </template>
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
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped>
.user {
  width: 100%;
}
</style>