<template>
  <div>
    <div class="top flex-a">
      <div
        class="font14 flex box"
        v-for="(item, index) in list"
        :key="Number(index)"
        ref="box"
      >
        <div
          class="actve flex"
          :class="{
            topone: route.meta.index == item.url,
          }"
        >
          <div
            class="flex"
            @contextmenu.prevent="right(Number(index))"
            @click="click(item, Number(index))"
          >
            <div v-if="route.meta.index == item.url">●</div>
            <div>{{ item.name }}</div>
            <div
              v-if="route.meta.index == item.url"
              @click.stop="del(item, Number(index))"
            >
              <i class="el-icon-close" v-if="list.length !== 1 && !flag"></i>
            </div>
          </div>
          <div
            class="close font12 nowap flex-d"
            v-if="show && rightindex == index"
          >
            <div class="flex1 flex-ja" @click.stop="other(item)">关闭其他</div>
            <div class="flex1 flex-ja" @click.stop="left(item, Number(index))">
              关闭左侧
            </div>
            <div
              class="flex1 flex-ja"
              @click.stop="delright(item, Number(index))"
            >
              关闭右侧
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from "vue";
import { useClickOutside } from "@/hooks/useCliskOutside";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
interface Obj {
  name: string;
  url: string;
}
export default defineComponent({
  setup() {
    let box = ref<HTMLElement | null>(null);
    let { isClickOutside } = useClickOutside(box);
    let route = useRoute();
    let arr = ref<Obj[]>([]);
    let show = ref<boolean>(false);
    let acitveindex = ref<number>(0); //背景颜色
    let rightindex = ref<number>(-1);
    let store = useStore(); //vuex
    let router = useRouter(); //路由
    let flag = ref<boolean>(false);
    let list = computed(() => {
      return JSON.parse(store.state.tabList);
    });
    watch(
      () => isClickOutside.value,
      (val) => {
        show.value = val;
      }
    );
    watch(
      () => show.value,
      (val) => {
        isClickOutside.value = val;
      }
    );
    onMounted(() => {
      // console.log(isClickOutside.value);
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
      if (list.value.length > 1) {
        flag.value = false;
      } else {
        flag.value = true;
      }
      if (index !== 0) {
        router.push(list.value[index - 1].url);
        list.value.splice(index, 1);
      } else {
        if (list.value.length == 1) {
          router.push("/");
          list.value.splice(index, 1);
          list.value.push({ name: "首页", url: "/" });
          modify();
        }
        router.push(list.value[index + 1].url);
        list.value.splice(index, 1);
      }
      modify();
    };
    //关闭其他
    let other = (item: any) => {
      router.push(item.url);
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
        router.push(list.value[0].url);
        modify();
      }
    };
    //关闭右侧
    let delright = (item: any, index: number) => {
      console.log(index);
      if (index === list.value.length - 1) {
        ElMessage.warning("已经是最后一个了");
      } else {
        list.value.splice(index + 1, list.value.length - 1);
        router.push(list.value[list.value.length - 1].url);
        store.commit("settabList", JSON.stringify(list.value));
      }
    };
    let modify = () => {
      store.commit("settabList", JSON.stringify(list.value));
      localStorage.setItem("tabList", JSON.stringify(list.value));
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
      box,
      flag,
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