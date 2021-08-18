<template>
  <el-card>
    <el-alert
      title="注意:只允许为第三级分类设置相关参数!"
      type="warning"
      :closable="false"
      show-icon
    >
    </el-alert>
    <div class="flex-a goods">
      <div class="font18">选择商品分类:</div>
      <div class="options">
        <el-cascader
          :options="options"
          :props="Props"
          v-model="optionsvalue"
          @change="change"
        ></el-cascader>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="first"></el-tab-pane>
      <el-tab-pane label="静态属性" name="second"></el-tab-pane>
    </el-tabs>
    <div>
      <el-button type="primary" size="mini" @click="add" :disabled="flag">{{
        activeName == "first" ? "添加参数" : "添加属性"
      }}</el-button>
    </div>
    <el-table :data="arr" style="width: 100%">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column type="expand">
        <template #default="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item>
              <span
                class="tags"
                v-for="(item, index) in props.row.attr_vals"
                :key="Number(index)"
              >
                <el-tag size="small" closable>{{ item }}</el-tag>
              </span>
              <span
                ><el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter="handleInputConfirm"
                  @change="change"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                  >+ New Tag</el-button
                ></span
              >
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="参数名称"
        prop="attr_name"
        width="770"
        align="center"
      >
      </el-table-column>
      <el-table-column label="描述" prop="desc" width="770" align="center">
        <el-button type="primary" icon="el-icon-edit" size="mini"
          >编辑</el-button
        >
        <el-button type="danger" icon="el-icon-delete" size="mini"
          >删除</el-button
        >
      </el-table-column>
    </el-table>
    <el-dialog
      :title="num ? '添加' + title : '编辑' + title"
      v-model="show"
      width="30%"
    >
      <el-form
        :model="attr_name"
        :rules="rules"
        ref="submit"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item :label="title" prop="attr_name">
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
import { defineComponent, ref, onMounted, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "../../http/api";
interface Obj1 {
  goods_name: string;
  goods_price: string;
  goods_weight: string;
  goods_number: string;
  goods_cat: string; //分类
}
interface Obj {
  attr_id: number;
  attr_name: string;
  attr_sel: string;
  cat_id: number;
  attr_vals: any;
}
interface Obj1 {
  roleDesc: string;
  roleName: string;
}
interface obj3 {
  value: string;
  label: string;
  children: any;
  expandTrigger: string;
}
interface obj4 {
  attr_name: string;
}
export default defineComponent({
  setup() {
    const show = ref<boolean>(false); //添加属性弹框
    let options = ref<Obj1[]>([]); //分类
    let optionsvalue = ref<any[]>([]); //选择器绑定的id数组
    let activeName = ref<string>("first"); //tab标签栏
    let sel = ref<string>("many"); //动态参数
    let arr = ref<Obj[]>([]); //表格数据
    let inputVisible = ref<boolean>(false);
    let inputValue = ref<string>("");
    let flag = ref<boolean>(true);
    let title = ref<string>("动态参数");
    let num = ref<number>(1);
    let Props = ref<obj3>({
      //选择数据
      value: "cat_id",
      label: "cat_name",
      children: "children",
      expandTrigger: "hover",
    });
    // 验证表单
    let attr_name = ref<obj4>({
      attr_name: "",
    });
    const rules = ref<any>({
      attr_name: [
        { required: true, message: "参数不能为空", trigger: "blur" },
        { min: 2, max: 8, message: "长度在 2到 8个字符", trigger: "blur" },
      ],
    });
    const submit = ref<any>(null);
    watch(
      () => optionsvalue.value[0],
      (val) => {
        if (val) flag.value = false;
      },
      { deep: true }
    );
    //点击弹框确定
    const submitForm = () => {
      submit.value!.validate((valid: boolean) => {
        if (valid) {
          addcategories();
          show.value = false;
        } else {
          console.log("填写失败");
        }
      });
    };
    // 选择商品分类
    let change = (e: any) => {
      console.log(sel.value);
      categories();
    };

    // 点击tab
    let handleClick = (e: any) => {
      if (e.props.name == "first") {
        sel.value = "many"; //动态
        title.value = "动态参数";
      } else {
        sel.value = "only"; //静态
        title.value = "静态属性";
      }
      // categories();
    };
    // 添加属性参数按钮
    let add = () => {
      show.value = true;
    };
    // 添加属性请求
    let addcategories = () => {
      api
        .addcategories({
          id: optionsvalue.value[2],
          attr_name: attr_name.value.attr_name,
          attr_sel: sel.value,
          attr_vals: "",
        })
        .then((res: any) => {
          console.log(res);
          if (res.meta.status === 201) {
            ElMessage.success(res.meta.msg);
          } else {
            ElMessage.warning(res.meta.msg);
          }
        })
        .catch((err) => {
          console.log(err, "添加参数失败");
        });
    };
    // input回车事件
    let handleInputConfirm = () => {
      console.log(inputValue.value);
    };
    // 点击标签
    let showInput = () => {
      inputVisible.value = true;
    };
    // 获取参数请求
    let categories = () => {
      api
        .categories({ id: optionsvalue.value[2], sel: sel.value })
        .then((res) => {
          arr.value = res.data;
          if (arr.value.length > 0) {
            arr.value.map((item: any) => {
              if (item.attr_vals !== "") {
                item.attr_vals = item.attr_vals.split(",");
              }
            });
          }
          console.log(arr.value);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 获取分类列表
    let getcategories = () => {
      api
        .getcategories()
        .then((res: any) => {
          options.value = res.data;
          console.log(options.value);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    onMounted(() => {
      getcategories();
    });
    return {
      options,
      Props,
      optionsvalue,
      change,
      activeName,
      handleClick,
      arr,
      inputVisible,
      inputValue,
      handleInputConfirm,
      showInput,
      show,
      rules,
      attr_name,
      submit,
      submitForm,
      sel,
      add,
      flag,
      title,
      num,
    };
  },
});
</script>

<style scoped>
.goods {
  margin: 20px 0px;
}
.options {
  margin-left: 10px;
}
.tags {
  margin-right: 10px;
}
</style>