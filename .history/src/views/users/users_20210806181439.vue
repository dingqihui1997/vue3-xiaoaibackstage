<template>
  <el-card class="box-card">
    <div class="user">
      <div class="flex">
        <el-input placeholder="请输入内容" v-model="input"> </el-input>
        <el-button type="info" icon="el-icon-search" :plain="true"></el-button>
        <div class="mal10">
          <el-button type="primary">添加用户</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    let input = ref<string>("");
    return {
      input,
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
</style>