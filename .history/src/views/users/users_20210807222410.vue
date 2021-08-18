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
          <el-input v-model="user.mobile"></el-input>
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
          <el-input v-model="edit.mobile"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="show = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog title="分配用户" v-model="flag" width="40%">
      <div class="margin-b20 font16">当前用户：{{ edit.username }}</div>
      <div class="margin-b10 font16">当前角色：{{ role_name }}</div>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="(item, index) in list"
          :key="index"
          :value="item.roleName"
        >
          <span style="float: left" @click="select(index)">{{
            item.roleName
          }}</span>
        </el-option>
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="flag = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
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
  roleName: string;
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
    let value = ref<string>(""); //下拉框
    let flag = ref<boolean>(false); //删除弹框
    let show = ref<boolean>(false); //用户编辑弹框
    let input = ref<string>(""); //搜索框
    let query = ref<string>(""); //查询参数
    let pagenum = ref<number>(1); //页数
    let pagesize = ref<number>(5); //每页返回条数
    const total = ref<number>(0); //总条数
    const id = ref<number>(0);
    let role_name = ref<string>("");
    let dialogVisible = ref<boolean>(false); //控制添加数据
    let arr = ref<Obj[]>([]); //用户列表
    let list = ref<Obj[]>([]);
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
    let handleEdit = (index: number, item: any, num: number) => {
      id.value = item.id;
      edit.value.username = item.username;
      role_name.value = item.role_name;
      if (num === 1) {
        show.value = true;
        edit.value.email = item.email;
        edit.value.mobile = item.mobile;
      } else if (num === 2) {
        open();
      } else {
        flag.value = true;
      }
    };
    // 弹出删除框，删除
    const open = () => {
      ElMessageBox.confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api
            .deleteUsers({ id: id.value })
            .then((res: any) => {
              console.log(res);
              if (res.meta.status === 200) {
                ElMessage({
                  type: "success",
                  message: "删除成功!",
                });
                Getusers();
              }
            })
            .catch((err) => {
              console.log(err, "删除失败");
            });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消删除",
          });
        });
    };
    // 选择角色
    let select = (e: any) => {
      console.log(e);
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
          if (res.meta.status === 201) {
            ElMessage.success(res.meta.msg);
            Getusers();
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
          if (res.meta.status === 200) {
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

    onMounted(() => {
      Getusers();
      roleslist();
    });
    //获取用户列表
    let Getusers = () => {
      api
        .Getusers({
          query: query.value,
          pagenum: pagenum.value,
          pagesize: pagesize.value,
        })
        .then((res: any) => {
          //   console.log(res);
          arr.value = res.data.users;
          total.value = res.data.total;
          console.log(arr.value);
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    };
    // 获取角色列表
    let roleslist = () => {
      api
        .roleslist()
        .then((res) => {
          list.value = res.data;
          console.log(list.value);
        })
        .catch((err) => {
          console.log(err, "获取角色列表失败");
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
      flag,
      open,
      value,
      list,
      role_name,
      select,
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