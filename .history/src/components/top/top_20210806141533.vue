<template>
  <div>
    <div class="top flex-a">
      <div
        class="topone font14 flex"
        v-for="(item, index) in list"
        :key="index"
      >
        <div>●</div>
        <div>{{ item.name }}</div>
        <div>
          <i class="el-icon-close"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
interface Obj {
  name: string;
  url: string;
}
export default defineComponent({
  setup() {
    let store = useStore(); //vuex
    let arr = ref<Obj[]>([]);
    // arr.value = JSON.parse(localStorage.getItem("tabList")!);
    // console.log(arr.value);
    let list = computed(() => {
      return JSON.parse(store.state.tabList);
    });
    console.log(list.value);
    return {
      arr,
      list,
      store,
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