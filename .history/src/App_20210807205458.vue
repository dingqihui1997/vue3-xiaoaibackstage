<template>
  <el-config-provider :locale="locale">
    <App />
  </el-config-provider>
</template>

<script lang="ts">
import { ElConfigProvider } from "element-plus";
import { defineComponent } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import App from "./App.vue";
export default defineComponent({
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  setup() {
    return {
      locale: zhCn,
    };
  },
});
</script>

<style lang="scss">
@import "./styles/common.scss";
@import "./styles/ui.scss";
</style>
