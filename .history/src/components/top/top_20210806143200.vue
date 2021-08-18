<template>
  <div>
    <div class="top flex-a">
      <div
        class="actve font14 flex"
        v-for="(item, index) in list"
        :key="index"
        @click="click(item, index)"
        :class="{ topone: acitveindex == index }"
      >
        <div v-if="acitveindex == index">●</div>
        <div>{{ item.name }}</div>
        <div v-if="acitveindex == index">
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
    let acitveindex = ref<number>(0);
    console.log(acitveindex.value);
    let store = useStore(); //vuex
    let list = computed(() => {
      return JSON.parse(store.state.tabList);
    });
    console.log(list.value);
    let click = (item: string, index: number) => {
      console.log(index);
      acitveindex.value = index;
    };
    return {
      list,
      store,
      click,
      acitveindex,
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
.actve {
  padding: 0px 10px;
  border: 1px #eee solid;
}
</style>