import { createApp } from "vue/dist/vue.esm-bundler.js";
import { createPinia } from "pinia";
import App from "./App.vue";

import mcInput from "@/components/Input.vue";
import mcButton from "@/components/Button.vue";
import Error from "@/components/Error.vue";

import "highlight.js/styles/stackoverflow-light.css";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";

const app = createApp(App);

app.use(createPinia());
app.use(hljsVuePlugin);

app.component("mc-input", mcInput);
app.component("mc-button", mcButton);
app.component("Error", Error);

app.mount("#app");
