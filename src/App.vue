<script setup>
import { useStore } from "vuex";
import { onMounted, toRefs } from "vue";
import time_line from "@/time_line";

const store = useStore();
const app_data = store.state.app_data;
const { simple_mode } = toRefs(app_data);

onMounted(() => {
  store.commit("update_app_data", {
    time_line: new time_line("#draw", String(simple_mode)=="true" ? "simple" : "detail"),
  });
});

var lastScrollFireTime = 0;
document.addEventListener(
  "wheel",
  function (e) {
    if (e.altKey) {
      e.preventDefault();
      if (new Date() - lastScrollFireTime > 100) {
        store.dispatch("rescale", e.deltaY < 0);
        lastScrollFireTime = new Date();
      }
    }
  },
  { passive: false }
);
</script>

<template>
  <v-app>
    <AppBar />
    <NavBar />
    <v-main>
      <v-card flat>
        <div class="scroll_div"></div>
        <div
          id="time_line_tooltip"
          display="none"
          style="position: absolute; display: none"
        ></div>
        <div id="draw"></div>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({}),
};
</script>

<style lan="scss">
#draw {
  overflow: auto;
  /* cursor: grab; */
}

#time_line_tooltip {
  background-color: rgba(236, 205, 146, 0.863);
  padding: 15px;
  padding-bottom: 10px;
  border-radius: 5px;
}

.v-input__details {
  display: none !important;
}
::-webkit-scrollbar {
  width: 5px;
  height: 10px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}
::-webkit-scrollbar-thumb {
  border-radius: 2px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.8);
}

/* svg text {
  text-anchor: middle;
  dominant-baseline: middle;
} */
</style>
