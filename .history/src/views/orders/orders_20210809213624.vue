<template>
  <el-card class="box-card">
    <div class="user">
      <div class="flex">
        <div>
          <el-input placeholder="请输入内容" v-model="query"> </el-input>
        </div>
        <div>
          <el-button
            type="info"
            icon="el-icon-search"
            :plain="true"
            @click="search"
          ></el-button>
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
        prop="order_number"
        label="订单编号"
        width="800"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="order_price"
        label="订单价格"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="order_pay"
        label="是否付款"
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
  </el-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import api from "../../http/api";
interface Obj {
  order_number: string;
  order_price: number;
  create_time: number;
  is_send: string;
  order_pay: string;
}
export default defineComponent({
  setup() {
    let query = ref<string>("");
    let pagenum = ref<number>(1); //页数
    let pagesize = ref<number>(10); //每页返回条数
    const total = ref<number>(0); //总条数
    let arr = ref<Obj[]>([]);
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
          total.value = res.data.total;
          arr.value = res.data.goods;
        })
        .catch((err) => {
          console.log(err, "请求订单列表失败");
        });
    };
    const handleSizeChange = (val: number) => {
      pagesize.value = val;
    };
    const handleCurrentChange = (val: number) => {
      pagenum.value = val;
    };
    return {
      arr,
      total,
      query,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style scoped>
</style>