<template>
  <!-- 登录页面 -->
  <div class="box middlecenter">
    <div class="wi100 font22 flex-ja welcome">欢迎来到小爱后台管理系统</div>
    <el-form
      :model="user"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="username">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="活动名称" prop="password">
        <el-input v-model="user.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
interface Obj {
  username: string;
  password: string;
}
export default defineComponent({
  setup() {
    let user = ref<Obj>({
      username: "",
      password: "",
    });
    let rules = ref<any>({
      username: [
        { required: true, message: "请输入活动名称", trigger: "blur" },
        { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
      ],
      password: [
        { required: true, message: "请输入活动名称", trigger: "blur" },
        { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
      ],
    });
    return {
      user,
      rules,
    };
  },
});
</script>

<style scoped lang="scss">
.box {
  width: 640px;
  height: 350px;
  margin: auto;
}
.welcome {
  height: 80px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}
</style>