import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import { useLocale, useLocaleProps } from 'element-plus'
const app = createApp(App)
app.use(ElementPlus, { locale })
app.use(store).use(router).mount("#app");

