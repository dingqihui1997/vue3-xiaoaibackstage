<template>
  <el-menu
    :default-active="route.meta.index"
    class="el-menu-vertical-demo"
    router
  >
    <el-menu-item index="" @click="click('首页', '/')">
      <i class="el-icon-s-home"></i>
      <template #title>首页</template>
    </el-menu-item>
    <el-submenu :index="item.path" v-for="(item, index) in arr" :key="index">
      <template #title>
        <i :class="icon1[index]"></i>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="'/' + item1.path"
          v-for="(item1, index1) in item.children"
          :key="index1"
          @click="click(item1.authName, item1.path)"
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
import { useRoute } from "vue-router";
import { useStore } from "vuex";
interface Obj {
  id: number;
  authName: string;
  path: string;
  children: Obj[];
}
interface Obj1 {
  name: string;
  url: string;
}
let arr = ref<Obj[]>([]);
export default defineComponent({
  setup() {
    let route = useRoute();
    let store = useStore(); //vuex
    let icon1 = ref<string[]>([
      //一级分类图标
      "el-icon-user",
      "el-icon-folder",
      "el-icon-shopping-bag-2",
      "el-icon-s-order",
      "el-icon-message",
    ]);
    let icon = ref<any[]>([
      //二级分类图标
      ["el-icon-folder-opened"],
      ["el-icon-setting", "el-icon-c-scale-to-original"],
      ["el-icon-bangzhu", "el-icon-bell", "el-icon-date"],
      ["el-icon-folder-add"],
      ["el-icon-position"],
    ]);
    // 点击事件
    let list = ref<Obj1[]>([]);
    let n = JSON.parse(localStorage.getItem("tabList")!);
    let num = ref<string>(""); //查找元素
    let click = (item: string, path: string) => {
      // console.log(item, path);
      // console.log(n);
      let navobj = ref<Obj1>({ name: item, url: path });
      if (n) {
        list.value = n;
        let a = list.value.find((item1: any) => {
          return item1.name === item;
        });
        if (!a) {
          list.value.push(navobj.value);
          console.log(9999);
        }
      } else {
        list.value.push(navobj.value);
        console.log(11111);
      }
      store.commit("settabList", JSON.stringify(list.value));
      localStorage.setItem("tabList", JSON.stringify(list.value));
    };
    onMounted(() => {
      api
        .getmenus()
        .then((res: any) => {
          // console.log(res);
          arr.value = res.data;
          // console.log(arr.value);
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    });
    return {
      arr,
      icon1,
      icon,
      route,
      click,
      list,
      num,
    };
  },
});
</script>

<style scoped>
</style>