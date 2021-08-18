<template>
  <el-container>
    <el-header>
      <div class="wi100 flex-sba hei100">
        <div class="flex-ja mal10 font16">欢迎来到小爱后台系统</div>
        <div class="flex">
          <div>{{ time }}</div>
          <div class="mal10">亲爱的，{{ user }}</div>
          <div class="mal10 margin-r20 out">退出</div>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px"><left></left></el-aside>
      <div style="border-top: 1px solid #eeeeee">
        <el-main><router-view></router-view></el-main>
      </div>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import left from "../../components/left/Left.vue";
import dayjs from "dayjs";
export default defineComponent({
  components: {
    left,
  },
  setup() {
    let time = ref<any>(null); //时间倒计时
    setInterval(() => {
      time.value =
        new Date().toLocaleString() + " ".charAt(new Date().getDay());
    }, 1000);
    let user = ref<string>(localStorage.getItem("user")!);
    return {
      time,
      user,
    };
  },
});
</script>

<style scoped>
.out {
  color: #40b8ff;
}
</style>