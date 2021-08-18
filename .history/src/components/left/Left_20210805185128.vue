<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" router>
    <el-submenu index="item.path" v-for="(item, index) in arr" :key="index">
      <template #title>
        <i class="el-icon-location"></i>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item-group
        v-for="(item1, index1) in item.children"
        :key="index1"
      >
        <template #title>{{ item1.authName }}</template>
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
    let one = ref<Obj>({
      id: 0,
      authName: "首页",
      path: "home",
      children: [],
    });
    onMounted(() => {
      api
        .getmenus()
        .then((res: any) => {
          console.log(res);
          arr.value = res.data;
          arr.value.unshift(one.value);
          console.log(arr.value);
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    });
    return {
      arr,
      one,
    };
  },
});
</script>

<style scoped>
</style>