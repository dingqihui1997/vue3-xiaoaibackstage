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
                <el-button type="success" @click="next(1)" size="medium"
                  >下一步</el-button
                >
              </div>
            </div></el-tab-pane
          >
          <el-tab-pane label="商品参数" name="second" :disabled="first">
            <div class="nexttwo">
              <div v-for="(item, index) in only" :key="index">
                <div class="guige">
                  {{ item.attr_name }}
                </div>
                <div
                  v-for="(item1, index1) in item.attr_vals"
                  :key="Number(index1)"
                >
                  <el-tag class="tag">
                    {{ item1 }}
                  </el-tag>
                  <div v-if="!item1">暂无数据</div>
                </div>
              </div>
              <div v-if="only.length === 0">暂无参数</div>
              <el-button type="success" @click="next(2)" size="small"
                >下一步</el-button
              >
            </div>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="third" :disabled="second"
            >商品属性</el-tab-pane
          >
          <el-tab-pane label="商品图片" name="fourth">商品图片</el-tab-pane>
          <el-tab-pane label="商品内容" name="last">商品内容</el-tab-pane>
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
interface Obj {
  attr_id: number;
  attr_name: string;
  attr_sel: string;
  attr_vals: any;
}
export default defineComponent({
  setup() {
    let flag = ref<boolean>(false);
    let first = ref<boolean>(true); //步骤er
    let second = ref<boolean>(true); //步骤三
    let active = ref<number>(0); //步骤条下标
    let options = ref<Obj1[]>([]); //分类
    let activeName = ref<string>("first");
    let sel = ref<string>("only "); //静态
    let only = ref<Obj[]>([]); //静态参数
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
    //    点击tab导航栏
    let click = (e: any) => {
      console.log(e);
    };
    // 表单填写完成下一步
    let next = (num: number) => {
      if (num === 1) {
        active.value = 1;
        activeName.value = "second";
        first.value = false;
        categories();
        // categories(); //跳到第二部
      } else if (num === 2) {
        //第二部
        active.value = 2;
        activeName.value = "third";
        second.value = false;
      }
    };
    // 获取商品参数静态
    let categories = () => {
      api
        .categories({
          id: Number(edit.value.goods_cat[edit.value.goods_cat.length - 1]),
          sel: sel.value,
        })
        .then((res: any) => {
          console.log(res);
          only.value = res.data;
          if (only.value) {
            only.value.map((item) => {
              if (item.attr_vals) {
                item.attr_vals = item.attr_vals.split(",");
              }
            });
          }
          console.log(only.value);
        })
        .catch((err) => {
          console.log(err, "获取静态参数失败");
        });
    };
    // 商品分类列表数据
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
    // 监听
    watch(
      () => [edit.value],
      (val) => {
        flag.value = Object.values(val[0]).every((item: string) => {
          return item !== "";
        });
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
      step,
      click,
      flag,
      activeName,
      next,
      only,
      first,
      second,
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
.nexttwo {
  margin-left: 20px;
  margin-top: 20px;
}
.tag {
  margin-top: 10px;
}
.guige {
  margin-bottom: 10px;
}
</style>