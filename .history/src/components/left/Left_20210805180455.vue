<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    <el-submenu index="1" v-for="(item, index) in arr" :key="index">
      <template #title>
        <i class="el-icon-location"></i>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item-group
        v-for="(item1, index1) in item.children"
        :key="index1"
      >
        <template #title>{{ item1.authName }}</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <!-- <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <template #title>导航二</template>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <template #title>导航三</template>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <template #title>导航四</template>
    </el-menu-item> -->
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import api from "../../http/api";
interface Obj {
  id: number;
  name: string;
  path: string;
  children: [];
}
let arr = ref<Obj[]>([]);
export default defineComponent({
  setup() {
    onMounted(() => {
      api
        .getmenus()
        .then((res: any) => {
          console.log(res);
          arr.value = res.data;
          console.log(arr.value);
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    });
    return {
      arr,
    };
  },
});
</script>

<style scoped>
</style>