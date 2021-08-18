<template>
  <el-card>
    <div class="top">
      <el-alert title="添加商品信息" type="info" center :closable="false">
      </el-alert>
    </div>
    <div class="top steps">
      <el-steps :active="active" finish-status="success">
        <el-step
          :title="item"
          v-for="(item, index) in step"
          :key="index"
        ></el-step>
      </el-steps>
    </div>
    <div class="flex-sb mat20">
      <div>
        <el-tabs tab-position="left" @tab-click="click" v-model="activeName">
          <el-tab-pane label="基本信息" name="first"
            ><div class="tab">
              <el-form
                :model="edit"
                :rules="rules"
                ref="submit"
                class="demo-ruleForm"
              >
                <el-form-item label="商品名称" prop="goods_name">
                  <el-input v-model="edit.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="goods_price">
                  <el-input
                    v-model="edit.goods_price"
                    :disabled="edit.goods_name == ''"
                  ></el-input>
                </el-form-item>
                <el-form-item label="商品重量" prop="goods_weight">
                  <el-input
                    v-model="edit.goods_weight"
                    :disabled="edit.goods_price == ''"
                  ></el-input>
                </el-form-item>
                <el-form-item label="商品数量" prop="goods_number">
                  <el-input
                    v-model="edit.goods_number"
                    :disabled="edit.goods_weight == ''"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="商品分类"
                  label-width="80px"
                  prop="goods_cat"
                >
                  <el-cascader
                    v-model="edit.goods_cat"
                    :options="options"
                    :props="Props"
                    :disabled="edit.goods_number == ''"
                  ></el-cascader>
                </el-form-item>
              </el-form>
              <div class="next" v-if="flag">
                <el-button type="success">下一步</el-button>
              </div>
            </div></el-tab-pane
          >
          <el-tab-pane label="商品参数">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片">商品图片</el-tab-pane>
          <el-tab-pane label="商品内容">商品内容</el-tab-pane>
        </el-tabs>
      </div>
      <div></div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import api from "../../http/api";

interface Obj1 {
  goods_name: string;
  goods_price: string;
  goods_weight: string;
  goods_number: string;
  goods_cat: string; //分类
}
interface obj3 {
  value: string;
  label: string;
  children: any;
}
export default defineComponent({
  setup() {
    let flag = ref<boolean>(false);
    let active = ref<number>(0); //步骤条下标
    let options = ref<Obj1[]>([]); //分类
    let value = ref<any[]>([]); //
    let activeName = ref<string>("first");
    let step = ref<string[]>([
      //选择器
      "基本信息",
      "商品参数",
      "商品属性",
      "商品图片",
      "商品内容",
      "完成",
    ]);
    let Props = ref<obj3>({
      //选择数据
      value: "cat_id",
      label: "cat_name",
      children: "children",
    });
    // 表单验证
    let edit = ref<Obj1>({
      //添加用户
      goods_name: "",
      goods_price: "",
      goods_weight: "",
      goods_number: "",
      goods_cat: "", //分类
    });
    // 点击tab标签
    let click = (e: any) => {
      console.log(e);
    };
    let rules = ref<any>({
      goods_name: [
        { required: true, message: "商品名称不能为空", trigger: "blur" },
      ],
      goods_price: [
        { required: true, message: "商品价格不能为空", trigger: "blur" },
      ],
      goods_weight: [
        { required: true, message: "商品重量不能为空", trigger: "blur" },
      ],
      goods_number: [
        { required: true, message: "商品数量不能为空", trigger: "blur" },
      ],
    });
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
    watch(
      () => [edit.value],
      (val) => {
        flag.value = Object.values(val[0]).every((item: string) => {
          return item !== "";
        });
        if (flag.value) active.value = 1;
      },
      { deep: true }
    );
    onMounted(() => {
      getcategories();
    });
    return {
      active,
      edit,
      rules,
      options,
      Props,
      value,
      step,
      click,
      flag,
    };
  },
});
</script>

<style scoped>
.top {
  margin-left: 140px;
}
.steps {
  margin-top: 30px;
}
.tab {
  margin-left: 40px;
}
.el-input {
  width: 1360px !important;
}
.next {
  margin-left: 80px;
  margin-top: 10px;
}
</style>