<template>
  <!-- 登录页面 -->
  <div class="box middlecenter denglu">
    <div class="font22 flex-ja welcome">欢迎来到小爱后台管理系统</div>
    <el-form
      :model="user"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="请输入用户名" prop="username">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="请输入密码" prop="password">
        <el-input v-model="user.password"></el-input>
      </el-form-item>
    </el-form>
    <div class="mal10">
      特别提醒:
      如果您是管理员,请使用管理员账号登录,如果不知道账号,请联系公司人事。
    </div>
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
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 6, max: 8, message: "长度在 6到 8个字符", trigger: "blur" },
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 6, message: "长度在 6 到 8 个字符", trigger: "blur" },
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
  width: 630px;
  height: 350px;
  margin: auto;
  box-shadow: 0 0 15px #eee;
}
.welcome {
  height: 80px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}
.el-input__inner {
  width: 400px;
}
</style>