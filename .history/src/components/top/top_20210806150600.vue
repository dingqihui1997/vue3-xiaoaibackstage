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
      <div class="close font14">
        <div>关闭其他</div>
        <div class="margintb">关闭左侧</div>
        <div>关闭右侧</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
interface Obj {
  name: string;
  url: string;
}
export default defineComponent({
  setup() {
    let acitveindex = ref<number>(0);
    let store = useStore(); //vuex
    let router = useRouter(); //路由
    let list = computed(() => {
      return JSON.parse(store.state.tabList);
    });
    //切换路由导航
    let click = (item: any, index: number) => {
      router.push(`/${item.url}`);
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
  margin-right: 10px;
}
.close {
  padding: 15px 10px;
  box-shadow: 0 0 10px #eee;
}
</style>