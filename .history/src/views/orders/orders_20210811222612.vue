<template>
  <el-card class="box-card">
    <div class="flex margin-b10">
      <div style="width: 400px">
        <el-input placeholder="请输入内容" v-model="query"> </el-input>
      </div>
      <div class="posi">
        <el-button
          type="info"
          icon="el-icon-search"
          :plain="true"
          @click="search"
        ></el-button>
      </div>
    </div>
    <el-table :data="arr" border>
      <el-table-column
        fixed
        prop="date"
        label="#"
        width="100"
        type="index"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="order_number" label="订单编号" align="center">
      </el-table-column>
      <el-table-column prop="order_price" label="订单价格" align="center">
      </el-table-column>
      <el-table-column prop="pay_status" label="是否付款" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.pay_status == 0" type="danger">未付款</el-tag>
          <el-tag v-if="scope.row.pay_status == 1" type="success"
            >已付款</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" align="center">
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleEdit(scope.row, 1)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-location-outline"
            size="mini"
            @click="handleEdit(scope.row, 0)"
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
    <el-dialog title="编辑地址" v-model="dialogVisible" width="30%">
      <el-cascader
        v-model="optionsvalue"
        :options="citys"
        @change="handleChange"
      ></el-cascader>
    </el-dialog>
    <el-dialog title="物流信息" v-model="show"> </el-dialog>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import api from "../../http/api";
import dayjs from "dayjs";
import city from "../../lib/city";
import axios from "axios";
interface Obj {
  order_number: string;
  order_price: number;
  create_time: number;
  is_send: string;
  pay_status: string;
}
export default defineComponent({
  setup() {
    let optionsvalue = ref<any[]>([]); //选择器绑定的id数组
    let query = ref<string>("");
    let pagenum = ref<number>(1); //页数
    let pagesize = ref<number>(10); //每页返回条数
    const total = ref<number>(0); //总条数
    let dialogVisible = ref<boolean>(false);
    let arr = ref<Obj[]>([]);
    let stepList = ref<any[]>([]);
    let show = ref<boolean>(false);
    let citys = city;
    let search = () => {
      orders();
    };
    onMounted(() => {
      orders();
      console.log(citys);
    });
    let handleEdit = (item: any, num: number) => {
      console.log(item);
      if (num) {
        dialogVisible.value = true;
      } else {
        getKuaidi1();

        show.value = true;
      }
    };
    // 订单数据列表
    let orders = () => {
      api
        .orders({
          query: query.value,
          pagenum: pagenum.value,
          pagesize: pagesize.value,
        })
        .then((res: any) => {
          // console.log(res);
          total.value = res.data.total;
          arr.value = res.data.goods;
          arr.value.map((item: any) => {
            item.create_time = dayjs(item.create_time).format(
              `YYYY-MM-DD HH:mm:ss`
            );
          });
        })
        .catch((err) => {
          console.log(err, "请求订单列表失败");
        });
    };
    // 分页
    const handleSizeChange = (val: number) => {
      pagesize.value = val;
      orders();
    };
    const handleCurrentChange = (val: number) => {
      pagenum.value = val;
      orders();
    };
    let handleChange = () => {
      //
    };
    let getKuaidi1 = () => {
      let token = localStorage.getItem("token");
      let id = ref(1106975712662);
      axios
        .get(
          `https://www.liulongbin.top:8888/api/private/v1/kuaidi/${id.value}`,
          {
            headers: { Authorization: token },
          }
        )
        .then((res: any) => {
          if (res.status === 200) {
            stepList.value = res.data.data;
          }
        })
        .catch(() => {
          console.log("物流请求失败");
        });
    };
    return {
      arr,
      total,
      query,
      handleSizeChange,
      handleCurrentChange,
      pagenum,
      search,
      handleEdit,
      dialogVisible,
      citys,
      handleChange,
      optionsvalue,
      show,
    };
  },
});
</script>

<style scoped>
.posi {
  position: relative;
  left: -5px;
}
</style>