<template>
  <div>
    <div class="top flex-a">
      <div class="topone font14" v-for="(item, index) in arr" :key="index">
        ●{{ item.name }}
        <i class="el-icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
interface Obj {
  name: string;
  url: string;
}
export default defineComponent({
  setup() {
    let arr = ref<Obj[]>([]);
    arr.value = JSON.parse(localStorage.getItem("tabList")!);
    console.log(arr.value);
    return {
      arr,
    };
  },
});
</script>

<style scoped>
.top {
  /* margin: 10px; */
  margin-top: -10px;
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid #eee;
}
.topone {
  background: #409eff;
  padding: 0px 10px;
  color: #fff;
  margin-right: 10px;
}
</style>