<template>
  <div>
    <div class="top flex-a">
      <div class="topone font14">首页</div>
    </div>
    <div class="xiaoai flex-ja font24 font-w7">欢迎来到小爱后台管理系统</div>
  </div>
</template>

<script lang="ts">
interface Obj1 {
  name: string;
  url: string;
}
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    let Store = useStore();
    let tabList = ref<Obj1[]>([]);
    let num = computed(() => {
      return (tabList.value = Store.state.tabList);
    });
    console.log(tabList.value);
    return {
      Store,
      num,
      tabList,
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
}
.xiaoai {
  /* position: absolute; */
  margin: auto;
  width: 100%;
  height: 570px;
}
</style>
