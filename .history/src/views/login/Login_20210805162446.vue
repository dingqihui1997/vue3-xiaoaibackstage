<template>
  <!-- 登录页面 -->
  <div class="box middlecenter denglu">
    <div class="font22 flex-ja welcome">欢迎来到小爱后台管理系统</div>
    <el-form
      :model="user"
      :rules="rules"
      ref="submit"
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
    <div class="mal20">
      特别提醒:
      如果您是管理员,请使用管理员账号登录,如果不知道账号,请联系公司人事。
    </div>
    <div @click="submitForm" class="button flex-ja">
      <el-button type="primary">立即登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import api from "../../http/api";
interface Obj {
  username: string;
  password: string;
}
export default defineComponent({
  setup() {
    // 表单规则
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
    // 验证表单
    let submit = ref<any>(null);
    let submitForm = () => {
      submit.value!.validate((valid: boolean) => {
        if (valid) {
          //校验通过
          alert("submit!");
          api
            .login({
              username: user.value.username,
              password: user.value.password,
            })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log("请求失败", err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    return {
      user,
      rules,
      submitForm,
      submit,
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
.button {
  margin-top: 20px;
}
</style>