<template>
  <div>
    <el-card class="box-card">
      <div class="margin-b20">
        <el-button type="primary" @click="add">添加角色</el-button>
      </div>
      <el-table :data="arr" style="width: 100%" :border="true">
        <el-table-column type="expand">
          <template #default="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item>
                <div
                  v-for="(item, index) in props.row.children"
                  :key="Number(index)"
                >
                  <div class="flex-a boxtag">
                    <div class="tag">
                      <el-tag closable :disable-transitions="false">
                        {{ item.authName }}
                      </el-tag>
                      <i class="el-icon-caret-right"></i>
                    </div>
                    <div>
                      <div
                        v-for="(item1, index1) in item.children"
                        :key="Number(index1)"
                        class="margin10 flex"
                      >
                        <div>
                          <el-tag
                            closable
                            :disable-transitions="false"
                            type="success"
                          >
                            {{ item1.authName }}
                          </el-tag>
                          <i class="el-icon-caret-right"></i>
                        </div>
                        <div class="flex">
                          <div
                            class="margin-r20"
                            v-for="(item2, index2) in item1.children"
                            :key="Number(index2)"
                          >
                            <el-tag type="warning" closable>
                              {{ item2.authName }}</el-tag
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          label="#"
          align="center"
        ></el-table-column>
        <el-table-column label="职位" prop="roleName" align="center">
        </el-table-column>
        <el-table-column label="描述" prop="roleDesc" align="center">
        </el-table-column>
        <el-table-column label="操作" prop="desc" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handle(scope.$index, scope.row, 1)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handle(scope.$index, scope.row, 2)"
              >删除</el-button
            >
            <el-button type="warning" size="mini">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title="id ? '编辑角色' : '添加角色'"
        v-model="show"
        width="30%"
      >
        <el-form
          :model="user"
          :rules="rules"
          ref="submit"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="角色名" prop="roleName">
            <el-input v-model="user.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="user.roleDesc"></el-input>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import api from "../../http/api";
import { ElMessage, ElMessageBox } from "element-plus";
interface Obj {
  id: number;
  roleDesc: string;
  roleName: string;
  children: Obj[];
}
interface Obj1 {
  roleDesc: string;
  roleName: string;
}
export default defineComponent({
  setup() {
    const arr = ref<Obj[]>([]); //角色列表
    const show = ref<boolean>(false); //添加角色弹框
    let id = ref<number>(0); //id
    const user = ref<Obj1>({
      //添加用户
      roleName: "",
      roleDesc: "",
    });
    // 添加用户表单验证
    let rules = ref<any>({
      roleName: [
        { required: true, message: "角色名不能为空", trigger: "blur" },
        { min: 2, max: 8, message: "长度在 2到 8个字符", trigger: "blur" },
      ],
    });
    let submit = ref<any>(null);
    let submitForm = () => {
      submit.value!.validate((valid: boolean) => {
        if (valid) {
          if (id.value) {
            //有id就是编辑
            Editroles();
          } else {
            //没有就是添加角色
            addroles();
          }
          show.value = false;
        } else {
          console.log("填写失败");
        }
      });
    };
    onMounted(() => {
      roleslist();
    });
    //获取角色列表
    let roleslist = () => {
      api
        .roleslist()
        .then((res: any) => {
          arr.value = res.data;
          console.log(arr.value);
        })
        .catch((err) => {
          console.log(err, "获取角色列表失败");
        });
    };
    // 操作编辑
    let handle = (index: number, item: any, num: number) => {
      id.value = item.id;
      user.value.roleName = item.roleName;
      if (num === 1) {
        show.value = true;
      } else if (num === 2) {
        open();
      }
    };
    // 添加角色按钮
    let add = () => {
      id.value = 0;
      show.value = true;
    };
    // 添加角色请求
    let addroles = () => {
      api
        .addroles({
          roleName: user.value.roleName,
          roleDesc: user.value.roleDesc,
        })
        .then((res: any) => {
          success(res);
          roleslist();
        })
        .catch((err) => {
          console.log(err, "添加用户失败");
        });
    };
    // 编辑角色
    let Editroles = () => {
      api
        .Editroles({
          id: id.value,
          roleName: user.value.roleName,
          roleDesc: user.value.roleDesc,
        })
        .then((res: any) => {
          if (res.meta.status === 200) {
            ElMessage.success("修改成功");
            roleslist();
          }
        })
        .catch((err) => {
          console.log(err, "编辑角色失败");
        });
    };
    // 删除弹框,删除角色
    const open = () => {
      ElMessageBox.confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api
            .delroles({ id: id.value })
            .then((res: any) => {
              console.log(res);
              success(res);
              roleslist();
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
    let success = (res: any) => {
      if (res.meta.status === 200) {
        ElMessage.success(res.meta.msg);
      } else {
        ElMessage.warning(res.meta.msg);
      }
    };
    return {
      arr,
      handle,
      add,
      show,
      user,
      rules,
      submitForm,
      submit,
      id,
    };
  },
});
</script>

<style scoped>
.tag {
  margin-right: 150px;
}
.boxtag {
  border-bottom: 1px solid #eee;
  width: 1516px;
}
</style>