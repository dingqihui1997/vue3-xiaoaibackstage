<template>
  <el-card>
    <el-button type="primary" @click="add" class="add">添加分类</el-button>
    <el-table
      :data="tabledata"
      style="width: 100%; margin-bottom: 20px"
      row-key="cat_id"
      current-row-key="index"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="#" width="50" align="center"> </el-table-column>
      <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="name" label="是否有效" align="center">
        <el-icon class="el-icon-success" color="#409EFC"></el-icon>
      </el-table-column>
      <el-table-column label="排序" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.cat_level == 0">一级</el-tag>
          <el-tag v-if="scope.row.cat_level == 1" type="success">二级</el-tag>
          <el-tag v-if="scope.row.cat_level == 2" type="warning">三级</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleEdit(scope.row, 1)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="handleEdit(scope.row, 0)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="num ? '添加参数' : '编辑参数'"
      v-model="show"
      width="30%"
      @close="close"
    >
      <el-form
        :model="attr_name"
        :rules="rules"
        ref="submit"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称" prop="attr_name">
          <el-input v-model="attr_name.attr_name"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" v-if="num">
          <el-cascader
            :disabled="attr_name.attr_name == ''"
            :options="arr"
            :props="Props"
            v-model="optionsvalue"
            @change="change"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="show = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
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
import { defineComponent, ref, onMounted } from "vue";
import api from "../../http/api";
import { ElMessage, ElMessageBox } from "element-plus";
interface Obj {
  cat_id: number;
  cat_level: number;
  cat_deleted: boolean;
  cat_name: string;
  cat_pid: number;
  children: [];
}
interface Obj1 {
  attr_name: string;
}
interface obj3 {
  value: string;
  label: string;
  children: any;
  checkStrictly: boolean;
}
export default defineComponent({
  setup() {
    let optionsvalue = ref<any[]>([]); //选择器绑定的id数组
    const show = ref<boolean>(false); //添加属性弹框
    let pagenum = ref<number>(1); //页数
    let pagesize = ref<number>(10); //每页条数
    let total = ref<number>(0); //总条数
    let tabledata = ref<Obj[]>([]); //分类数据
    let arr = ref<Obj[]>([]); //分类
    let num = ref<number>(0);
    let cat_id = ref<number>(0);
    let cat_level = ref<number>(0); //分类层级
    let Props = ref<obj3>({
      //选择数据
      value: "cat_id",
      label: "cat_name",
      children: "children",
      checkStrictly: true,
    });
    let attr_name = ref<Obj1>({
      attr_name: "",
    });
    const rules = ref<any>({
      attr_name: [
        { required: true, message: "参数不能为空", trigger: "blur" },
        { min: 2, max: 12, message: "分类名称在 2到 12个位", trigger: "blur" },
      ],
    });
    const submit = ref<any>(null);
    // 点击弹框确定
    let submitForm = () => {
      submit.value!.validate((valid: boolean) => {
        if (valid) {
          if (num.value) {
            //添加
            addgoos();
          } else {
            //编辑
            editgoos();
          }
        } else {
          console.log("填写失败");
        }
        show.value = false;
      });
    };
    // 添加分类
    let add = () => {
      show.value = true;
      num.value = 1;
    };
    // 关闭弹窗
    let close = () => {
      attr_name.value.attr_name = "";
      optionsvalue.value = [];
    };
    onMounted(() => {
      getcategories1();
      getcategories2();
    });
    // 获取分类分页10条
    let getcategories1 = () => {
      api
        .getcategories1({ pagenum: pagenum.value, pagesize: pagesize.value })
        .then((res: any) => {
          total.value = res.data.total;
          tabledata.value = res.data.result;
        })
        .catch((err) => {
          console.log(err, "获取分类失败");
        });
    };
    // 所有分类
    let getcategories2 = () => {
      api
        .getcategories1({ pagenum: "", pagesize: "" })
        .then((res: any) => {
          arr.value = res.data;
          arr.value.map((item: Obj) => {
            if (item.children) {
              item.children.map((item1: any) => {
                item1.children = undefined;
              });
            }
          });
        })
        .catch((err) => {
          console.log(err, "获取分类失败");
        });
    };
    // 选择操作 分类名称
    let change = () => {
      if (optionsvalue.value.length !== 0) {
        cat_id.value = optionsvalue.value[optionsvalue.value.length - 1];
      }
      console.log(optionsvalue.value);
      if (optionsvalue.value.length === 1) {
        //判断层级分类
        cat_level.value = 0;
      } else if (optionsvalue.value.length === 1) {
        cat_level.value = 1;
      } else {
        cat_level.value = 2;
      }
    };
    // 编辑操作
    let handleEdit = (item: any, index: number) => {
      console.log(item);
      num.value = 0;
      cat_id.value = item.cat_id;
      attr_name.value.attr_name = item.cat_name;
      if (index) show.value = true;
      else delgoos();
    };
    // 提交编辑请求
    let editgoos = () => {
      api
        .editgoos({ id: cat_id.value, cat_name: attr_name.value.attr_name })
        .then((res: any) => {
          console.log(res);
          if (res.meta.status == 200) {
            ElMessage.success(res.meta.msg);
            getcategories1();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 添加商品分类请求
    let addgoos = () => {
      api
        .addgoos({
          cat_pid: cat_id.value,
          cat_name: attr_name.value.attr_name,
          cat_level: cat_level.value,
        })
        .then((res: any) => {
          console.log(res);
          if (res.meta.status == 201) {
            ElMessage.success(res.meta.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 删除参数
    let delgoos = () => {
      api
        .delgoos({ id: cat_id.value })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 分页
    const handleSizeChange = (val: number) => {
      pagesize.value = val;
      getcategories1();
    };
    const handleCurrentChange = (val: number) => {
      pagenum.value = val;
      getcategories1();
    };
    return {
      tabledata,
      handleEdit,
      show,
      attr_name,
      rules,
      submitForm,
      submit,
      num,
      add,
      Props,
      close,
      optionsvalue,
      change,
      arr,
      total,
      pagenum,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style scoped>
.add {
  margin-bottom: 20px;
}
</style>