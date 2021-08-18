<template>
  <el-menu default-active="0" class="el-menu-vertical-demo" router>
    <el-menu-item index="4">
      <i class="HomeFilled"></i>
      <template #title>首页</template>
    </el-menu-item>
    <el-submenu :index="item.path" v-for="(item, index) in arr" :key="index">
      <template #title>
        <i class="el-icon-location"></i>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="item1.path"
          v-for="(item1, index1) in item.children"
          :key="index1"
          >{{ item1.authName }}</el-menu-item
        >
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