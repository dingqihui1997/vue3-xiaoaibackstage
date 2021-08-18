<template>
  <el-card class="box-card">
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
        <el-switch v-model="arr.mg_state"> </el-switch>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-setting"
            size="mini"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加用户" v-model="dialogVisible" width="40%">
      <el-form
        :model="user"
        :rules="rules"
        ref="submit"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model.number="user.mobile"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
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
          <el-input v-model.number="edit.mobile"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="show = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import api from "../../http/api";
import { useLocale, useLocaleProps } from "element-plus";
interface Obj {
  create_time: number;
  email: string;
  id: number;
  mg_state: boolean;
  mobile: string;
  role_name: string;
  username: string;
}
interface Obj1 {
  username: string;
  password: string;
  email: string;
  mobile: string;
}
export default defineComponent({
  props: {
    // 如果你需要你的应用可以相应式的更新语言，那么这里的 props 必须包含下面这个 props
    ...useLocaleProps,
  },
  setup() {
    useLocale();
    let show = ref<boolean>(false); //用户编辑弹框
    let input = ref<string>(""); //搜索框
    let query = ref<string>(""); //查询参数
    let pagenum = ref<number>(1); //页数
    let pagesize = ref<number>(5); //每页返回条数
    const total = ref<number>(0); //总条数
    const id = ref<number>(0);
    let dialogVisible = ref<boolean>(false); //控制添加数据
    let arr = ref<Obj[]>([]);
    let user = ref<Obj1>({
      //添加用户
      username: "",
      password: "",
      email: "",
      mobile: "",
    });
    let edit = ref<Obj1>({
      //添加用户
      username: "",
      password: "",
      email: "",
      mobile: "",
    });
    let rules = ref<any>({
      username: [
        { required: true, message: "用户名不能为空", trigger: "blur" },
        { min: 2, max: 6, message: "长度在 2到 6个字符", trigger: "blur" },
      ],
      password: [
        { required: true, message: "密码不能为空", trigger: "blur" },
        { min: 6, max: 6, message: "长度在 6 到 8 个字符", trigger: "blur" },
      ],
      email: [
        { required: true, message: "邮箱不能为空", trigger: "blur" },
        {
          type: "email",
          message: "请输入正确的邮箱地址",
          trigger: ["blur", "change"],
        },
      ],
      mobile: [
        { required: true, message: "电话不能为空", trigger: "blur" },
        {
          type: "number",
          min: 11,
          max: 11,
          message: "请输入正确电话",
          trigger: "blur",
        },
      ],
    });
    // 确定按钮
    let submit = ref<any>(null);
    let submitForm = () => {
      submit.value!.validate((valid: boolean) => {
        if (valid) {
          //验证通过发请求添加新用户
          if (id.value) {
            getEditusers(); //id是0就添加新用户
          } else {
            getAddusers(); //不为0就是编辑用户
          }
          dialogVisible.value = false;
          show.value = false;
        } else {
          console.log("填写失败");
        }
      });
    };
    // 编辑
    let handleEdit = (index: number, item: any) => {
      console.log(item, index);
      show.value = true;
      id.value = item.id;
      edit.value.username = item.username;
      edit.value.email = item.email;
      edit.value.mobile = item.mobile;
    };
    // 添加用户
    let getAddusers = () => {
      id.value = 0;
      api
        .getAddusers({
          username: user.value.username,
          password: user.value.password,
          email: user.value.email,
          mobile: Number(user.value.mobile),
        })
        .then((res: any) => {
          console.log(res);
          if (res.meta.status === 201) {
            ElMessage.success(res.meta.msg);
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
      //条数
    };
    // 编辑用户
    let getEditusers = () => {
      api
        .getEditusers({
          id: id.value,
          email: edit.value.email,
          mobile: Number(edit.value.mobile),
        })
        .then((res: any) => {
          console.log(res);
          if (res.meta.status === 201) {
            ElMessage.success(res.meta.msg);
          }
        })
        .catch((err) => {
          console.log(err, "编辑用户失败");
        });
    };
    //分页
    const handleSizeChange = (val: number) => {
      pagesize.value = val;
      Getusers();
    };
    const handleCurrentChange = (val: number) => {
      pagenum.value = val;
      Getusers();
    };
    //获取用户列表
    onMounted(() => {
      Getusers();
    });
    let Getusers = () => {
      api
        .Getusers({
          query: query.value,
          pagenum: pagenum.value,
          pagesize: pagesize.value,
        })
        .then((res: any) => {
          console.log(res);
          arr.value = res.data.users;
          total.value = res.data.total;
          console.log(arr.value);
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    };
    //弹出框
    let click = () => {
      dialogVisible.value = true;
    };
    return {
      input,
      pagenum,
      total,
      arr,
      dialogVisible,
      click,
      user,
      rules,
      submit,
      submitForm,
      handleEdit,
      getAddusers,
      handleSizeChange,
      handleCurrentChange,
      show,
      edit,
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