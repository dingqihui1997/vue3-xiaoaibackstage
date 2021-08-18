<template>
  <div class="img">
    <img src="../../assets/404.jpg" class="img100" />
    <div class="flex-ja"><button @click="back">返回首页</button></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    let router = useRouter();
    let back = () => {
      router.back();
    };
    return {
      back,
    };
  },
});
</script>
// <script lang="ts">
//   import { useRouter } from "vue-router";}
// export default {
//   name: "",
//   props: {},
//   data() {
//     return {};
//   },
//   components: {},
//   methods: {
//     back() {
//       this.$router.push("/");
//     },
//   },
//   mounted() {},
//   computed: {},
//   watch: {},
// };
//
</script>

<style lang='scss' scoped>
.img {
  position: absolute;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  img {
    height: 450px;
    width: 100%;
  }
}
button {
  height: 30px;
  width: 80px;
  background-color: #3bb6fc;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  position: relative;
  top: -50px;
}
</style>