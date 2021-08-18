<template>
  <el-card>
    <el-button type="primary">添加分类</el-button>
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
            @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="handleEdit(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加分类" v-model="show" width="30%">
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
import { defineComponent, ref, onMounted } from "vue";
import api from "../../http/api";
interface Obj {
  cat_id: number;
  cat_level: number;
  cat_deleted: boolean;
  cat_name: string;
  cat_pid: number;
  children: Obj[];
}
interface Obj1 {
  attr_name: string;
}
export default defineComponent({
  setup() {
    const show = ref<boolean>(false); //添加属性弹框
    let pagenum = ref<number>(1); //页数
    let pagesize = ref<number>(10); //每页条数
    let total = ref<number>(0); //总条数
    let tabledata = ref<Obj[]>([]); //分类数据
    let attr_name = ref<Obj1>({
      attr_name: "",
    });
    const rules = ref<any>({
      attr_name: [
        { required: true, message: "参数不能为空", trigger: "blur" },
        { min: 2, max: 8, message: "长度在 2到 8个字符", trigger: "blur" },
      ],
    });
    const submit = ref<any>(null);
    let submitForm = () => {
      submit.value!.validate((valid: boolean) => {
        if (valid) {
        } else {
          console.log("填写失败");
        }
      });
    };
    onMounted(() => {
      getcategories1();
    });
    // 获取分类
    let getcategories1 = () => {
      api
        .getcategories1({ pagenum: pagenum.value, pagesize: pagesize.value })
        .then((res: any) => {
          total.value = res.total;
          tabledata.value = res.data.result;

          console.log(tabledata.value);
        })
        .catch((err) => {
          console.log(err, "获取分类失败");
        });
    };
    // 操作
    let handleChange = () => {
      //
    };
    // 编辑操作
    let handleEdit = (item: any) => {
      show.value = true;
    };
    return {
      tabledata,
      handleChange,
      handleEdit,
      show,
      attr_name,
      rules,
      submitForm,
    };
  },
});
</script>

<style scoped>
</style>