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
            @click="search"
          ></el-button>
        </div>
        <div class="mal20">
          <el-button type="primary" @click="click('添加商品', 'addGoods')"
            >添加商品</el-button
          >
        </div>
      </div>
    </div>
    <el-table :data="arr" style="width: 100%">
      <el-table-column
        fixed
        prop="date"
        label="#"
        width="150"
        type="index"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="800"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格(元)"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="创建时间"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleEdit(scope.$index, scope.row, 0)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="handleEdit(scope.$index, scope.row, 1)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <el-dialog title="编辑商品" v-model="show" width="40%">
      <el-form
        :model="user"
        :rules="rules"
        ref="submit"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="user.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input v-model="user.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number">
          <el-input
            v-model="user.goods_number"
            type="number"
            min="1"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input v-model="user.goods_weight" type="number"></el-input>
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
import { defineComponent, onMounted, ref } from "vue";
import api from "../../http/api";
export default defineComponent({
  setup() {
    let query = ref<string>("");
    let pagenum = ref<number>(1); //页数
    let pagesize = ref<number>(10); //每页返回条数
    const total = ref<number>(0); //总条数
    onMounted(() => {
      orders();
    });
    let orders = () => {
      api
        .orders({
          query: query.value,
          pagenum: pagenum.value,
          pagesize: pagesize.value,
        })
        .then((res: any) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err, "请求订单列表失败");
        });
    };
    return {};
  },
});
</script>

<style scoped>
</style>