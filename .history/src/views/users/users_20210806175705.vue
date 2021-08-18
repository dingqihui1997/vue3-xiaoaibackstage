<template>
  <div class="user">
    <div>
      <el-input placeholder="请输入内容" v-model="input"> </el-input>
    </div>
  </div>
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
  margin-left: -20px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.el-input__inner {
  width: 370px;
  height: 40px;
}
</style>