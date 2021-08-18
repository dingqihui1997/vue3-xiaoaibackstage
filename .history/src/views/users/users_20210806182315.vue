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
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import api from "../../http/api";
export default defineComponent({
  setup() {
    let input = ref<string>("");
    let query = ref<string>(""); //查询参数
    let pagenum = ref<number>(1); //页数
    let pagesize = ref<number>(10); //每页返回条数
    onMounted(() => {
      api
        .Getusers({
          query: query.value,
          pagenum: pagenum.value,
          pagesize: pagesize.value,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    });
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
.el-button--info {
  margin-left: -10px;
}
</style>