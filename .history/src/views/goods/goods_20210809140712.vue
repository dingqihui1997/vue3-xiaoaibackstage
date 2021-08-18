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
          <el-button type="primary" @click="click">添加商品</el-button>
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
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "../../http/api";
import dayjs from "dayjs";
interface Obj {
  add_time: number;
  goods_name: string;
  goods_id: number;
  goods_price: number;
  is_promote: boolean;
  goods_weight: number;
}
export default defineComponent({
  setup() {
    let input = ref<string>(""); //搜索框,查询参数
    let pagenum = ref<number>(1); //页码
    let pagesize = ref<number>(10); //一页返回数据
    let total = ref<number>(0);
    let arr = ref<Obj[]>([]);
    // 搜索按钮
    let search = () => {
      if (input.value) {
        goodslist();
      }
    };
    watch(
      () => input.value,
      (val) => {
        if (!val) {
          input.value = "";
          goodslist();
        }
      }
    );
    // 添加商品
    let click = () => {
      //
    };
    // 操作编辑删除
    let handleEdit = (index: number, item: any, num: number) => {
      console.log(index, item, num);
      if (num) {
        //删除
        open();
        // arr.value.splice(index, 1);
      }
    };
    const open = () => {
      ElMessageBox.confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {})
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消删除",
          });
        });
    };
    onMounted(() => {
      goodslist();
    });
    // 获取商品列表
    let goodslist = () => {
      api
        .goodslist({
          query: input.value,
          pagenum: pagenum.value,
          pagesize: pagesize.value,
        })
        .then((res: any) => {
          total.value = res.data.total;
          arr.value = res.data.goods;
          console.log(arr.value);
          arr.value.map((item: any) => {
            item.add_time = dayjs(item.add_time).format(`YYYY-MM-DD HH:mm:ss`);
          });
        })
        .catch((err) => {
          console.log(err, "获取商品列表失败");
        });
    };
    // 分页
    const handleSizeChange = (val: number) => {
      pagesize.value = val;
      goodslist();
    };
    const handleCurrentChange = (val: number) => {
      pagenum.value = val;
      goodslist();
    };
    return {
      input,
      search,
      click,
      handleEdit,
      arr,
      handleSizeChange,
      handleCurrentChange,
      pagesize,
      pagenum,
      total,
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