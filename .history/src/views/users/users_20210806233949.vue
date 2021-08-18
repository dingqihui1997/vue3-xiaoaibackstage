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
          <el-button type="primary">添加用户</el-button>
        </div>
      </div>
    </div>
    <el-table :data="arr" border style="width: 100%">
      <el-table-column fixed prop="date" label="#" width="150">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="role_name" label="角色" width="120">
      </el-table-column>
      <el-table-column prop="mobile" label="电话" width="120">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="600"> </el-table-column>
      <el-table-column prop="mg_state" label="状态" width="120">
        <
        <el-switch
          v-model="item.mg_state"
          v-for="(item, index) in arr"
          :key="index"
        >
        </el-switch>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
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
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import api from "../../http/api";
interface Obj {
  create_time: number;
  email: string;
  id: number;
  mg_state: boolean;
  mobile: string;
  role_name: string;
  username: string;
}
export default defineComponent({
  setup() {
    let input = ref<string>(""); //搜索框
    let query = ref<string>(""); //查询参数
    let pagenum = ref<number>(1); //页数
    let pagesize = ref<number>(10); //每页返回条数
    let arr = ref<Obj[]>([]);
    onMounted(() => {
      api
        .Getusers({
          query: query.value,
          pagenum: pagenum.value,
          pagesize: pagesize.value,
        })
        .then((res) => {
          console.log(res);
          arr.value = res.data.users;
          console.log(arr.value);
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    });
    return {
      input,
      arr,
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