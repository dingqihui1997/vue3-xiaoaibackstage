<template>
  <div>
    <div class="top flex-a">
      <div
        class="font14 flex box"
        v-for="(item, index) in list"
        :key="Number(index)"
        @click="click(item, Number(index))"
      >
        <div
          class="actve flex"
          :class="{
            topone: route.meta.index == item.url,
          }"
        >
          <div class="flex" @contextmenu.prevent="right(Number(index))">
            <div v-if="route.meta.index == item.url">●</div>
            <div>{{ item.name }}</div>
            <div
              v-if="route.meta.index == item.url"
              @click="del(item, Number(index))"
            >
              <i class="el-icon-close"></i>
            </div>
          </div>
          <div
            class="close font12 nowap flex-d"
            v-if="show && rightindex == index"
          >
            <div class="flex1 flex-ja" @click="other(item)">关闭其他</div>
            <div class="flex1 flex-ja" @click="left(item, Number(index))">
              关闭左侧
            </div>
            <div class="flex1 flex-ja" @click="delright(item, index)">
              关闭右侧
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
interface Obj {
  name: string;
  url: string;
}
export default defineComponent({
  setup() {
    let route = useRoute();
    let arr = ref<Obj[]>([]);
    let show = ref<boolean>(false);
    let acitveindex = ref<number>(0); //背景颜色
    let rightindex = ref<number>(-1);
    let store = useStore(); //vuex
    let router = useRouter(); //路由
    let list = computed(() => {
      return JSON.parse(store.state.tabList);
    });
    //切换路由导航
    let click = (item: any, index: number) => {
      router.push(`${item.url}`);
      acitveindex.value = index;
    };
    // 右键事件
    let right = (index: number) => {
      rightindex.value = index;
      show.value = true;
    };
    let del = (item: any, index: number) => {
      //删除单个
      list.value.splice(index, 1);
      store.commit("settabList", JSON.stringify(list.value));
      localStorage.setItem("tabList", JSON.stringify(list.value));
    };
    //关闭其他
    let other = (item: any) => {
      arr.value.push(item);
      store.commit("settabList", JSON.stringify(arr.value));
      localStorage.setItem("tabList", JSON.stringify(list.value));
    };
    // 关闭左侧
    let left = (item: any, index: number) => {
      if (index === 0) {
        ElMessage.warning("已经是第一个了");
      } else {
        console.log(item, index);
        list.value.splice(0, index);
        store.commit("settabList", JSON.stringify(list.value));
        localStorage.setItem("tabList", JSON.stringify(list.value));
      }
    };
    let delright = (item: any, index: number) => {
      console.log(index);
      if (index === list.value.length + 1) {
        ElMessage.warning("已经是最后一个了");
      }
    };
    return {
      list,
      store,
      click,
      acitveindex,
      show,
      right,
      rightindex,
      del,
      router,
      route,
      other,
      left,
      delright,
    };
  },
});
</script>

<style scoped>
.top {
  height: 50px;
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
  position: relative;
}
.close {
  height: 100px;
  width: 68px;
  /* padding: 15px 10px; */
  box-shadow: 0 0 10px #eee;
  background: #fff;
  color: #333;
  position: absolute;
  top: 20px;
  left: 10px;
  right: 0;
  z-index: 9999;
}
</style>