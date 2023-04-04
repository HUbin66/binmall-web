
<template>
  <HelloWorld v-if="isRouterAlive"></HelloWorld>
</template>

<script>
import { provide, ref, nextTick } from "vue";
import HelloWorld from "./components/vue3/index.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  setup() {
    const isRouterAlive = ref(true);
    const reload = () => {
      isRouterAlive.value = false;
      nextTick(() => {
        isRouterAlive.value = true
      })
    }
    provide("reload", reload);
    return { isRouterAlive }
  },
};
</script>
