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
        <el-cascader :options="options" :props="Props"></el-cascader>
      </div>
    </div>
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
interface obj3 {
  value: string;
  label: string;
  children: any;
  expandTrigger: string;
}
export default defineComponent({
  setup() {
    let options = ref<Obj1[]>([]); //分类
    let Props = ref<obj3>({
      //选择数据
      value: "cat_id",
      label: "cat_name",
      children: "children",
      expandTrigger: "hover",
    });
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