<template>
  <el-menu default-active="0" class="el-menu-vertical-demo" router>
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <template #title>首页</template>
    </el-menu-item>
    <el-submenu :index="item.path" v-for="(item, index) in arr" :key="index">
      <template #title>
        <i :class="list[index]"></i>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="item1.path"
          v-for="(item1, index1) in item.children"
          :key="index1"
        >
          <template #title>
            <i :class="icon[index][index1]"></i>
            <span>{{ item1.authName }}</span>
          </template>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import api from "../../http/api";
interface Obj {
  id: number;
  authName: string;
  path: string;
  children: [];
}
let arr = ref<Obj[]>([]);
export default defineComponent({
  setup() {
    let list = ref<string[]>([
      //一级分类图标
      "el-icon-user",
      "el-icon-folder",
      "el-icon-shopping-bag-2",
      "el-icon-s-order",
      "el-icon-message",
    ]);
    let icon = ref<any[]>([
      //二级分类
      ["el-icon-folder-opened"],
      ["el-icon-setting"],
      ["el-icon-c-scale-to-original"],
      ["el-icon-bangzhu"],
      ["el-icon-bell"],
      ["el-icon-date"],
      ["el-icon-folder-add"],
      ["el-icon-position"],
    ]);
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
      list,
      icon,
    };
  },
});
</script>

<style scoped>
</style>