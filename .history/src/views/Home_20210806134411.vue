<template>
  <div>
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
    let tabList = computed(() => {
      return Store.state.tabList;
    });
    console.log(tabList.value);
    return {
      Store,
      tabList,
    };
  },
});
</script>

<style scoped>
.xiaoai {
  /* position: absolute; */
  margin: auto;
  width: 100%;
  height: 570px;
}
</style>
