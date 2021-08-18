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
      <el-table-column fixed prop="date" label="姓名" width="150">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="province" label="省份" width="120">
      </el-table-column>
      <el-table-column prop="city" label="市区" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" width="600">
      </el-table-column>
      <el-table-column prop="zip" label="邮编" width="120"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template>
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
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
          //   console.log(res);
          arr.value = res.data;
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