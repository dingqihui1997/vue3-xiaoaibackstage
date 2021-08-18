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
          <el-button type="primary" @click="click('首页', 'addGoods')"
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
interface Obj1 {
  goods_name: string;
  goods_price: string;
  goods_number: string;
  goods_weight: string;
}
interface Obj2 {
  name: string;
  url: string;
}
export default defineComponent({
  setup() {
    let input = ref<string>(""); //搜索框,查询参数
    let pagenum = ref<number>(1); //页码
    let pagesize = ref<number>(10); //一页返回数据
    let total = ref<number>(0);
    let arr = ref<Obj[]>([]);
    let activeindex = ref<number>(0);
    let id = ref<number>(0);
    let show = ref<boolean>(false);
    let nameurl = ref<Obj2>({
      //跳转路径
      name: "",
      url: "",
    });
    let user = ref<Obj1>({
      //添加用户
      goods_name: "",
      goods_price: "",
      goods_number: "",
      goods_weight: "",
    });
    // 表单验证
    let rules = ref<any>({
      goods_name: [
        { required: true, message: "商品名称不能为空", trigger: "blur" },
      ],
      goods_price: [
        { required: true, message: "商品价格不能为空", trigger: "blur" },
      ],
      goods_number: [
        { required: true, message: "商品数量不能为空", trigger: "blur" },
      ],
      goods_weight: [
        { required: true, message: "商品重量不能为空", trigger: "blur" },
      ],
    });
    let submit = ref<any>(null);
    let submitForm = () => {
      submit.value!.validate((valid: boolean) => {
        if (valid) {
          //验证通过发请求添加新用户
          show.value = false;
          ElMessage.success("修改成功");
        } else {
          console.log("填写失败");
        }
      });
    };
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
    // 添加商品,跳转
    let n = JSON.parse(localStorage.getItem("tabList")!);
    let click = (name: string, url: string) => {
      nameurl.value.name = name;
      nameurl.value.url = url;
      console.log(name, url);
    };
    // 操作编辑删除
    let handleEdit = (index: number, item: any, num: number) => {
      console.log(index, item, num);
      activeindex.value = index;
      id.value = item.goods_id;
      if (num) {
        //如果有num就是删除
        open();
      } else {
        //编辑
        user.value.goods_name = item.goods_name;
        user.value.goods_price = item.goods_price;
        user.value.goods_number = item.goods_number;
        user.value.goods_weight = item.goods_weight;
        show.value = true;
      }
    };
    // 删除弹框
    const open = () => {
      ElMessageBox.confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delgoods();
          goodslist();
        })
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
    // 删除商品
    const delgoods = () => {
      api
        .delgoods({ id: id.value })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err, "删除失败");
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
      show,
      user,
      rules,
      submit,
      submitForm,
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