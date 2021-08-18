<template>
  <el-card class="box-card">
    <div class="user">
      <div>
        <el-input placeholder="请输入内容" v-model="input"> </el-input>
        <el-button type="info" icon="el-icon-search" :plain="true"
          >搜索</el-button
        >
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
</style>