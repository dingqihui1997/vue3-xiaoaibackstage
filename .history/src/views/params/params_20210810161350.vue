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
      <el-button type="primary" size="mini">{{
        activeName == "first" ? "添加参数" : "添加属性"
      }}</el-button>
    </div>
    <el-table :data="arr" style="width: 100%">
      <el-table-column label="#" type="index"></el-table-column>

      <el-table-column type="expand">
        <template #default="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row }}</span>
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
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
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
}
interface obj3 {
  value: string;
  label: string;
  children: any;
  expandTrigger: string;
}
export default defineComponent({
  setup() {
    let options = ref<Obj1[]>([]); //分类
    let optionsvalue = ref<any[]>([]); //选择器绑定的id数组
    let activeName = ref<string>("first"); //tab标签栏
    let sel = ref<string>("many"); //动态参数
    let arr = ref<Obj[]>([]); //表格数据
    let Props = ref<obj3>({
      //选择数据
      value: "cat_id",
      label: "cat_name",
      children: "children",
      expandTrigger: "hover",
    });

    // 选择商品分类
    let change = (e: any) => {
      console.log(sel.value);
      categories();
    };
    // 获取参数
    let categories = () => {
      api
        .categories({ id: optionsvalue.value[2], sel: sel.value })
        .then((res) => {
          console.log(res);
          arr.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 点击tab
    let handleClick = (e: any) => {
      if (e.props.name == "first") {
        sel.value = "many"; //动态
      } else {
        sel.value = "only"; //静态
      }
    };
    // 获取分类列表
    let getcategories = () => {
      api
        .getcategories()
        .then((res: any) => {
          options.value = res.data;
          // console.log(options.value);
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
</style>